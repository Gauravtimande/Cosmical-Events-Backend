const User = require('../models/Users.js');
const Event = require('../models/Event.js');
const Vendor = require('../models/Vendors.js');

// users
const getTotalUsers =async (req, res) => {
    try {
        const totalUsers = await User.count();
        res.json({ totalUsers });
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch total users' });
    }
}


const getUserDetails =async (req, res) => {
    try {
        const userId = req.params.uid;
        const userDetails = await User.findByPk(userId);
        res.json({ userDetails });
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch user details' });
    }
}

// events
const  getTotalEvents = async(req, res) => {
    try {
        const totalEvents = await Event.findAll();
        res.json({ totalEvents });
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch total events' });
    }
}

const getEventDetails = async ( req, res) => {
    try {
        const evenetId = req.params.id;
        const eventDeatils = await Event.findByPk(evenetId);
        res.json(eventDeatils);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch event details' });
    }
}


//vendors

const getTotalVendors = async (req, res) => {
    try {
        const totalVendors = await Vendor.count();
        res.json({ totalVendors });
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch total vendors' });
    }
}


const getVendorDetails = async (req, res) => {
    try {
        const vendorId= req.params.id;
        const vendorDetails = await Vendor.findByPk(vendorId);
        res.json(vendorDetails);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch vendor details' });
    }
}


// event - coordinator
const getEventCoordinators = async (req, res) => {
    try {
        const coordinators = await Coordinators.findAll();
        res.json(coordinators)
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch co-ordinators' });
    }
}

const getEventCoordinatorDetails = async (req, res) => {
    try {
        const coordinatorId = req.params.id;
        const coordinatorDetails = await Coordinators.findByPk(coordinatorId);
        res.json(coordinatorDetails);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch co-ordinator details' });
    }
}

const createCoordinator = async( req, res)=>{
    try {
        const { name, email, username, role, password} = req.body;
        const existingCoordinator = await coordinator.findOne({ where: { email, mobile_number: `+91${mobile_number}` } });
        if(existingCoordinator){
            console.log('Coordinator already exists');
            return res.status(409).json({ message: 'Coordinator Email or mobile number already exists' });
        }
        const coordinator = await Coordinator.create(req.body);
         // Create New User in SQL
    const newCoordinator = await Coordinator.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role,
        mobile_number: `+91${mobile_number}`, // Store mobile number in +91 format
      });
      res.status(200).json({
        access_token: token,
        coordinator: {
          id: newCoordinator.id,
          name: newCoordinator.name,
          email: newCoordinator.email,
          role: newCoordinator.role
        },
        message: 'Coordinator created successfully'
      });
    } catch (error) {
        res.status(500).json({ error: 'Unable to create co-ordinator' });
    }
}

module.exports = {getTotalUsers,getUserDetails, getTotalEvents, getEventDetails, getTotalVendors, getVendorDetails,createCoordinator, getEventCoordinatorDetails, getEventCoordinators}