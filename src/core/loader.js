import _ from 'lodash';

const loadImage = function (imagesStore, actions, key, src) {
  var img = new Image();

  var d = new Promise(function (resolve, reject) {
    img.onload = function () {
      actions.images.load(key, img)
      resolve(img);
    };

    img.onerror = function () {
      var err = 'Could not load image: ' + src
      actions.images.error(err)
      reject(err);
    };
  });

  img.src = src;
  return d;
};

const getImage = function (imagesStore, key) {
  return (key in imagesStore.list) ? imagesStore.list[key] : null;
};

//return a promise list array
const loadList = (imageStore, actions, listObject) => {
  actions.images.start(_.keys(listObject).length)
  return _.reduce(listObject, (result, value, key)=> {
    return _.concat(result, loadImage(imageStore, actions, key, value))
  }, [])
}

const loader ={
  loadImage,
  getImage,
  loadList
}

export default loader