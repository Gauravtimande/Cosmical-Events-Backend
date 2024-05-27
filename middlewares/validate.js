const Joi = require('joi');



const meetingNotes = (req, res, next) => {
    let schema = Joi.object({
        
        notes: Joi.string().max(500).allow('', null),

    });
    validateRequest(req, res, next, schema);
}

const registerEventCoordinator = (req, res, next) => {
    let schema = Joi.object({
     
        fullname: Joi.string().max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(10).required(),
        
        mobile_number: Joi.string().pattern(/^[0-9]{10}$/).required(),
        

    });
    validateRequest(req, res, next, schema);
}

const feedbacks = (req, res, next) => {
    let schema = Joi.object({
        
     
        comment: Joi.string().max(1000).optional().allow('', null),
        rating: Joi.number().integer().min(1).max(5).required(),
   

    });
    validateRequest(req, res, next, schema);
}

const registerUsers = (req, res, next) => {
    let schema = Joi.object({
        fullname: Joi.string().max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(10).required(),
       
    
        mobile_number: Joi.string().pattern(/^[0-9]{10}$/).required(),
       

    });
    validateRequest(req, res, next, schema);

}

const registerVendors = (req, res, next) => {
    let schema = Joi.object({
       
        fullname: Joi.string().max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(10).required(),
       
        mobile_number: Joi.string().pattern(/^[0-9]{10}$/).required(),
       



    });
    validateRequest(req, res, next, schema);

}
const vendorservices = (req, res, next) => {
    let schema = Joi.object({
      
        vendor_id:Joi.string().uuid().required(), // Assuming vendor_id is a UUID
        serviceType: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(10).max(500).required(),
        priceRange: Joi.string().pattern(/^\d+-\d+$/).required(), // Format like "100-200"
        serviceInfo: Joi.string().optional(), // Optional field
        image: Joi.string().uri().optional(), // Optional URI field
        location: Joi.string().min(3).max(100).required(),
        city: Joi.string().min(2).max(100).required(),
        contactNo: Joi.string().pattern(/^[0-9]{10}$/).required(), // Adjust pattern as needed
        email: Joi.string().email().required(),
       
    });
    validateRequest(req, res, next, schema);

}

const validateRequest = (req, res, next, schema) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).send({ result: 'validation fail', errors: error.details });
    }
    next();
};



module.exports = { meetingNotes ,registerEventCoordinator,feedbacks,registerUsers,registerVendors,vendorservices }