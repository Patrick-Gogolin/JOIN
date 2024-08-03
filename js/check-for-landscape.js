/**
 * This Function checks for screenmode and gives warning if user is turning phone to landscape mode
 * 
 */
document.addEventListener('DOMContentLoaded', function() {
    const mobileWidthPortrait = 768;
    const mobileHeightPortrait = 1024;
    const mobileWidthLandscape = 1024;
    const mobileHeightLandscape = 768; 
    const maxMobileWidth = 932;
  
    function checkOrientation() {
      const isLandscape = window.innerWidth > window.innerHeight;
      const isMobile = window.innerWidth <= maxMobileWidth;
      const isMobilePortrait = isMobile && window.innerWidth <= mobileWidthPortrait && window.innerHeight <= mobileHeightPortrait;
      const isMobileLandscape = isMobile && window.innerWidth <= mobileWidthLandscape && window.innerHeight <= mobileHeightLandscape;

      if (isLandscape && (isMobilePortrait || isMobileLandscape)) {
        document.getElementById('landscape-warning').classList.add('visible');
      } else {
        document.getElementById('landscape-warning').classList.remove('visible');
      }
    }
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
  });

  function disableScroll() {
    document.body.style.overflow = 'hidden';
}