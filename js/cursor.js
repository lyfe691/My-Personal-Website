var timeout;

function fancyCursor(e) {
  let cursorSize = 24;
  let trailSize = 80;
  let scaleMin = 0.35;
  let scaleMax = 1.0;

  let finalX = e.pageX - (cursorSize * scaleMax) / 2;
  let finalY = e.pageY - (cursorSize * scaleMax) / 2;
  let finalTrailX = e.pageX - (trailSize * scaleMax) / 2;
  let finalTrailY = e.pageY - (trailSize * scaleMax) / 2;

  document.querySelector('.cursor').style.transform = 'translate(' + finalX + 'px,' + finalY + 'px) scale(' + scaleMin + ')';
  setTimeout(() => {
    document.querySelector('.cursor-trail').style.transform = 'translate(' + finalTrailX + 'px,' + finalTrailY + 'px) scale(' + scaleMin + ')';
  }, 100);

  if (timeout !== undefined) {
    window.clearTimeout(timeout);
  }

  timeout = window.setTimeout(function () {
    document.querySelector('.cursor').style.transform = 'translate(' + finalX + 'px,' + finalY + 'px) scale(' + scaleMax + ')';
    document.querySelector('.cursor-trail').style.transform = 'translate(' + finalTrailX + 'px,' + finalTrailY + 'px) scale(' + scaleMax + ')';
  }, 250);

  document.querySelector('.cursor').style.opacity = '1';
  document.querySelector('.cursor-trail').style.opacity = '1';
}

function cursorLoader() {
  if (isMobileDevice()) {
    
    document.querySelector('.cursor').style.display = 'none';
    document.querySelector('.cursor-trail').style.display = 'none';
    return; 
  }

  document.body.addEventListener('mousemove', fancyCursor);
  document.body.addEventListener('mouseleave', () => {
    document.querySelector('.cursor').style.opacity = '0';
    document.querySelector('.cursor-trail').style.opacity = '0';
  }, false);

  window.addEventListener('scroll', function () {
    document.querySelector('.cursor').style.opacity = '0';
    document.querySelector('.cursor-trail').style.opacity = '0';
  });
}

function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

window.addEventListener('load', function () {
  cursorLoader();
  function animate() {
    requestAnimationFrame(animate);
  }
  animate();
});
