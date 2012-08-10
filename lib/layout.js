(function() {
  var exactFit, layout, noBorder, noScale, oldLayout, showAll, wall,
    _this = this;

  oldLayout = this.layout;

  layout = {};

  if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
    module.exports = layout;
  } else {
    this.layout = layout;
    layout.noConflict = function() {
      _this.layout = oldLayout;
      return layout;
    };
  }

  noScale = function(area, target, positionX, positionY) {
    if (positionX == null) {
      positionX = 0.5;
    }
    if (positionY == null) {
      positionY = 0.5;
    }
    return {
      x: area.x + (area.width - target.width) * positionX,
      y: area.y + (area.height - target.height) * positionY,
      width: target.width,
      height: target.height
    };
  };

  showAll = function(area, target, positionX, positionY) {
    var areaRatio, r, targetRatio;
    if (positionX == null) {
      positionX = 0.5;
    }
    if (positionY == null) {
      positionY = 0.5;
    }
    r = {
      x: target.x,
      y: target.y
    };
    if (target.width > 0 && target.height > 0) {
      areaRatio = area.width / area.height;
      targetRatio = target.width / target.height;
      if (areaRatio > targetRatio) {
        r.width = target.width * (area.height / target.height);
        r.height = area.height;
      } else if (areaRatio < targetRatio) {
        r.width = area.width;
        r.height = target.height * (area.width / target.width);
      } else {
        r.width = area.width;
        r.height = area.height;
      }
    }
    return noScale(area, r, positionX, positionY);
  };

  noBorder = function(area, target, positionX, positionY) {
    var areaRatio, r, targetRatio;
    if (positionX == null) {
      positionX = 0.5;
    }
    if (positionY == null) {
      positionY = 0.5;
    }
    r = {
      x: target.x,
      y: target.y
    };
    if (target.width > 0 && target.height > 0) {
      areaRatio = area.width / area.height;
      targetRatio = target.width / target.height;
      if (areaRatio > targetRatio) {
        r.width = area.width;
        r.height = target.height * (area.width / target.width);
      } else if (areaRatio < targetRatio) {
        r.width = target.width * (area.height / target.height);
        r.height = area.height;
      } else {
        r.width = area.width;
        r.height = area.height;
      }
    }
    return noScale(area, r, positionX, positionY);
  };

  exactFit = function(area, target) {
    return {
      x: area.x,
      y: area.y,
      width: area.width,
      height: area.height
    };
  };

  wall = function(area, target, positionX, positionY) {
    if (positionX == null) {
      positionX = 0.5;
    }
    if (positionY == null) {
      positionY = 0.5;
    }
    if (area.width >= target.width && area.height >= target.height) {
      return noScale(area, target, positionX, positionY);
    } else {
      return showAll(area, target, positionX, positionY);
    }
  };

  layout.noScale = noScale;

  layout.showAll = showAll;

  layout.noBorder = noBorder;

  layout.exactFit = exactFit;

  layout.wall = wall;

}).call(this);
