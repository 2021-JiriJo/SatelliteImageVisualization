import app from './settings.js';
import controller from './controller.js';

/* Binding root to controller */
app.use('/',controller);

/* Open API Server */
app.listen(3000,()=>{
        console.log('Server On');
});
