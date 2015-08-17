function MozaicItem(ctx, x, y, width, height, path, color) {

  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.image = new Image();
  this.path = path;
  this.color = color;

  // var self = this;
  // this.image.onload = function() {
  //   self.ctx.drawImage(self.image, self.x, self.y, self.width, self.height);
  // };
  // this.image.src = path;
  // console.log(this.x + ',' + this.y + ':' + this.width + ',' + this.height);

  // console.log(this.ctx);
  // console.log("color:rgb(" + this.color + "), x:" + this.x + ", y:" + this.y + ", width:" + this.width + ", height:" + this.height);

  // this.ctx.fillStyle = "rgb(" + this.color + ")";
  // this.ctx.fillRect(this.x, this.y, this.width, this.height);

  console.log("draw end");
}

MozaicItem.prototype.render = function () {
  console.log("?");
  var self = this;
  this.image.onload = function() {
    self.ctx.drawImage(self.image, self.x, self.y, self.width, self.height);
  };
  this.image.src = this.path;

};
