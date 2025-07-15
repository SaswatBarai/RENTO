# RENTO Backend Deployment Guide

## Prerequisites

1. **AWS CLI** - Install and configure with your AWS credentials
2. **kubectl** - Kubernetes command-line tool
3. **eksctl** - Tool for creating EKS clusters
4. **Docker** - For building and testing images locally

## Local Development

### Using Docker Compose
```bash
# Start all services (backend + MongoDB)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Using Docker only
```bash
# Build the image
docker build -t rento-backend:latest ./backend

# Run with environment variables
docker run -d --name api -p 5001:5001 \
  -e MONGO_URI=mongodb://your-mongo-host:27017/rento \
  -e JWT_SECRET=your-jwt-secret \
  -e CLOUDINARY_CLOUD_NAME=your-cloud-name \
  -e CLOUDINARY_API_KEY=your-api-key \
  -e CLOUDINARY_API_SECRET=your-api-secret \
  -e RAZORPAY_KEY_ID=your-razorpay-key-id \
  -e RAZORPAY_KEY_SECRET=your-razorpay-key-secret \
  -e PORT=5001 \
  -e NODE_ENV=production \
  rento-backend:latest
```

## AWS Deployment

### 1. Create EKS Cluster
```bash
# Create EKS cluster
eksctl create cluster --name rento-cluster --region us-east-1 --nodegroup-name standard-workers --node-type t3.medium --nodes 3 --nodes-min 1 --nodes-max 4

# Update kubeconfig
aws eks update-kubeconfig --region us-east-1 --name rento-cluster
```

### 2. Create ECR Repository
```bash
# Create ECR repository
aws ecr create-repository --repository-name rento-backend --region us-east-1
```

### 3. Build and Push to ECR
```bash
# Get ECR login token
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Build and tag
docker build -t rento-backend:latest ./backend
docker tag rento-backend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/rento-backend:latest

# Push to ECR
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/rento-backend:latest
```

### 4. Update Kubernetes Manifests
Update `k8s/secret.yaml` with your actual environment variables (base64 encoded):
```bash
# Encode your values
echo -n "your-actual-value" | base64
```

Update `k8s/deployment.yaml` with your ECR image URL.

### 5. Deploy to Kubernetes
```bash
# Apply secrets
kubectl apply -f k8s/secret.yaml

# Apply deployment
kubectl apply -f k8s/deployment.yaml

# Check deployment status
kubectl get pods
kubectl get services
```

## CI/CD with GitHub Actions

### 1. Set up GitHub Secrets
Add these secrets to your GitHub repository:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

### 2. Push to main branch
The GitHub Action will automatically:
- Build the Docker image
- Push to ECR
- Deploy to EKS

## Monitoring

### View application logs
```bash
kubectl logs -f deployment/rento-backend
```

### Check pod status
```bash
kubectl get pods
kubectl describe pod <pod-name>
```

### Check service
```bash
kubectl get svc
```

## Scaling

### Scale the deployment
```bash
kubectl scale deployment rento-backend --replicas=5
```

### Auto-scaling
```bash
kubectl autoscale deployment rento-backend --cpu-percent=50 --min=2 --max=10
```

## Cleanup

### Delete EKS cluster
```bash
eksctl delete cluster --name rento-cluster --region us-east-1
```

### Delete ECR repository
```bash
aws ecr delete-repository --repository-name rento-backend --region us-east-1 --force
```
