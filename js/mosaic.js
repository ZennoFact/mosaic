function MozaicItem(ctx, x, y, width, height, path, color) {

  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.image = new Image();
  this.path = path;

  var self = this;
  this.image.onload = function() {
    self.ctx.drawImage(self.image, self.x, self.y, self.width, self.height);
  };
  this.image.src = path;
  // console.log(this.x + ',' + this.y + ':' + this.width + ',' + this.height);
}

MozaicItem.prototype.render = function () {
  console.log("?");
  var self = this;
  this.image.onload = function() {
    self.ctx.drawImage(self.image, self.x, self.y, self.width, self.height);
  };
  this.image.src = this.path;

};
