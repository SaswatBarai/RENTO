export const scrollToTop = () => {
    try {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        setTimeout(() => {
            if (window.pageYOffset > 0) {
                window.scrollTo(0, 0);
            }
        }, 100);
        setTimeout(() => {
            if (document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            }
        }, 200);
    } catch {
        window.scrollTo(0, 0);
    }
}