'use strict';

export const findPosition = (el) => {
  let viewportOffset = el.getBoundingClientRect();
  let top = viewportOffset.top + window.scrollY;
  let left = viewportOffset.left + window.scrollX;
  return {top,left};
};

export const parseElement = (parent) => {
  if (typeof parent === 'string') {
    parent = document.getElementById(parent.replace('#',''));
  }

  if (parent instanceof HTMLElement || parent instanceof SVGElement){
    return parent;
  } else {
    return 'No valid parent argument';
  }
};

export const locateMouse = (e,offset) => {
  return {
    x: e.pageX - offset.left,
    y: e.pageY - offset.top
  };
};

export const locateTouch = (e,offset) => {
  return {
    x: e.targetTouches.length ? e.targetTouches[0].pageX - offset.left : false,
    y: e.targetTouches.length ? e.targetTouches[0].pageY - offset.top : false
  };
};

export const SmartCanvas = function(parent, fps) {

  this.element = document.createElement('canvas');
  this.context = this.element.getContext('2d');
  this.scale = window.devicePixelRatio || 1;
  this.lastRefreshTime = 0;  
  parent.appendChild(this.element);

  this.resize = (w,h) => {
    this.element.width = w * this.scale;
    this.element.height = h * this.scale;
    this.element.style.width = w+'px';
    this.element.style.height = h+'px';
  };
  
  this.setFramerate = (newFramerate) => {
	  this.millisecondsPerFrame = newFramerate ? 1000/newFramerate : 0;
  };
  this.refreshIntervalReached = (currentTime) => {
	  if (!this.millisecondsPerFrame) {
		  return true;
	  } else if ((currentTime - this.lastRefreshTime) >= this.millisecondsPerFrame) {
		  this.lastRefreshTime = currentTime;
		  return true;
	  }
  };
  this.setFramerate(fps);

};

// Export default para compatibilidad con import dom from
export default {
  findPosition,
  parseElement,
  locateMouse,
  locateTouch,
  SmartCanvas
};
