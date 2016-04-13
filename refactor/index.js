Slide = function(target, urls, imageHeight, imageWidth){
  this.target = target;
  this.urls = urls;
  this.imageHeight = imageHeight;
  this.imageWidth = imageWidth;
  this.currentIndex = 0;
  this.container = document.createElement('div');
  this.pagerContainer = document.createElement('ol');
  this.timer = null;
  this.delay = null;

  // init container style
  this.container.className = 'slide-container';

  // init target style
  this.target.style.height = imageHeight;
  this.target.style.width = imageWidth;
  this.target.className = 'slide-target';

  // init pagerContainer style
  this.pagerContainer.className = 'slide-pager-container';

  // init event delegate for pagerContainer
  this.pagerContainer.addEventListener('click', function(e){
    if(e.target && e.target.nodeName === "LI"){
      this.slideTo(parseInt(e.target.getAttribute('data-index')));
      this.stopSlide();
      this.startSlide(this.delay);
    }
  }.bind(this));

  urls.forEach(function(url, index){

    // image
	  var image = document.createElement('img');
    image.setAttribute('src', url);
    this.container.appendChild(image);

    // pager
    var pager = document.createElement('li');
    pager.appendChild(document.createTextNode(index));
    pager.setAttribute('data-index', index);

    //init pager style
    pager.className = 'slide-pager';
    this.pagerContainer.appendChild(pager);
  }.bind(this));

  this.target.appendChild(this.container);
  this.target.appendChild(this.pagerContainer);

  this.slideTo(0);
};

Slide.prototype.slideTo = function(index){

  // inactive current then active index
  this.pagerContainer.childNodes[this.currentIndex].className = 'slide-pager';
  this.pagerContainer.childNodes[index].className = 'slide-pager slide-pager-active';

  // slide
  this.container.style.top = -index * this.imageHeight;
  this.currentIndex = index;
};

Slide.prototype.startSlide = function(delay){
  this.timer = setInterval(function(){
    if(this.currentIndex >= this.urls.length - 1){
      this.slideTo(0);
    }else{
      this.slideTo(this.currentIndex + 1);
    }
  }.bind(this), delay);
  this.delay = delay;
};

Slide.prototype.stopSlide = function(){
  if(this.timer){
    clearInterval(this.timer);
    this.timer = null;
  }
};


(function(){
  // start
	var target = document.getElementById('slide');
	var obj = new Slide(target, [
		"https://fuss10.elemecdn.com/e/ea/6aff99c88dbc4eed6b46034886b8fpng.png?imageMogr2/format/webp/quality/85",
		"https://fuss10.elemecdn.com/2/0a/ceef756987f56fd0ec73b01bd4493png.png?imageMogr2/format/webp/quality/85",
	  "https://fuss10.elemecdn.com/a/20/39f31c22d1f01b35d79b2a06da1ebpng.png?imageMogr2/format/webp/quality/85"
	], 98, 1180);
  obj.startSlide(3000);
})();

