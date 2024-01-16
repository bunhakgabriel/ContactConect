exports.Message = (req, res, next) => {
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    res.locals.user = req.session.user
    res.locals.contatos = req.session.contatos
  
    next();
  };
