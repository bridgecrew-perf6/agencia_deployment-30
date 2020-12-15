import {Viaje} from '../models/Viaje.js';
import {Testimonial} from '../models/Testimoniales.js'

const paginaInicio = async(req, res) => {

    //Consultar 3 viajes del modelo Viaje

    const promiseDB = [];

    promiseDB.push( Viaje.findAll({limit: 3}) );
    promiseDB.push( Testimonial.findAll({limit: 3}) );
    try {
        const resultado = await Promise.all(promiseDB); //Ambas consultas van a arrancar al mismo tiempo

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);     
    }

}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {
    
    //Consultar BD
    const viajes = await Viaje.findAll();
    console.log(viajes)
    
    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes,
    });
}

const paginaTestimoniales = async (req, res) => {
    
    try {
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
    
}

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    
    const {slug} = req.params;

    try {
        const viaje = await Viaje.findOne({where : {slug : slug}});
        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}