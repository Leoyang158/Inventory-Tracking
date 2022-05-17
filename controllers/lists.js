const Item = require('../models/item');

module.exports.index = async (req, res) =>{
    const items = await Item.find({});
    res.render('lists/index', {items});
}

module.exports.renderNewForm = (req,res) => {
    res.render('lists/new');
}

module.exports.createItem = async (req, res, next) => {
    const good = new Item(req.body.good);
    good.author = req.user._id;
    await good.save();
    req.flash('success', 'Successfully make a new car');
    res.redirect(`/lists/${good._id}`)
}

module.exports.showItem = async (req, res) => {  
    const good = await Item.findById(req.params.id).populate({   
        path: 'reviews',
        populate:{
            path: 'author'
        }
    }).populate('author');
    if(!good){
        req.flash('error', 'Cannot find that item');
        return res.redirect('/lists')
    }
    res.render('lists/show', { good });
}

module.exports.editItem = async (req, res) => { 
    //middleware has higher order 
    const { id } = req.params;
    const good = await Item.findById(id);
    if(!good){
        req.flash('error', 'Cannot find that item');
        return res.redirect('/lists')
    }
    res.render('lists/edit', { good });
}

module.exports.validateItem = async (req, res) => {
    const { id } = req.params;
    const good = await Vehicle.findByIdAndUpdate(id, { ...req.body.item });
    req.flash('success', 'Successfully updated vehicle');
    res.redirect(`/lists/${good._id}`)
}

module.exports.deleteItem = async (req, res) => {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted a review');
    res.redirect('/lists');
}