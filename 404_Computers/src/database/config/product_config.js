const fs = require('fs');
const path = require('path');

module.exports = {
    eliminarImagen: (image)=>{
        try{
            fs.unlinkSync(path.join(__dirname, "../../../public/images/products",image));
            console.log('----------> Imagen eliminada con exito.')
        }catch(err) {
            console.error('----------> Hubo un error al eliminar la imagen.', err)
        }
    },
    eliminarBanner: (image)=>{
        try{
            fs.unlinkSync(path.join(__dirname, "../../../public/images/banners",image));
            console.log('----------> Banner eliminado con exito.')
        }catch(err) {
            console.error('----------> Hubo un error al eliminar el Banner.', err)
        }
    }
}    