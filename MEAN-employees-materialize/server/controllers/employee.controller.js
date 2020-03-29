const Employee = require('../models/employee');
const EmployeeCtrl = {};

EmployeeCtrl.createEmployee = async (req,res) => {
    const employee = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    await employee.save();
    res.json(employee);
};

EmployeeCtrl.getEmployees = async (req, res) =>{
    const employees = await Employee.find();
    res.json(employees);
};

EmployeeCtrl.updateEmployee = async (req,res) =>{
    //obtener id de otra forma distinta a esta "req.params.id"
    const { id } = req.params;
   
    const employee = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    }

    //{ new: true} := te devuelve la entidad acualizada
    // {upsert: true} := te crea el dato si no existe
   const newEmployee = await Employee.findByIdAndUpdate(id, {$set: employee}, {upsert: true});
   res.json({status: 'Update employee successfuly!'});
   
};

EmployeeCtrl.deleteEmployee = async (req, res) =>{
   await Employee.findByIdAndRemove(req.params.id);
   res.json({
       status: 'Empleado Eliminado'
   })
};

EmployeeCtrl.getEmployee = async (req, res)=>{
   const employee = await Employee.findById(req.params.id);
   res.json(employee);
};

module.exports = EmployeeCtrl;