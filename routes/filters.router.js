const express = require('express');
const FiltersService = require('./../services/filters.service');

const router = express.Router();
const service = new FiltersService();

router.get('/category/:id',
    async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await service.filterCategory(id);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/user/:id',
    async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await service.filterUser(id);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
  
);

router.get('/search/:name',
async (req, res, next) => {
    try {
      const { name } = req.params;
      const rta = await service.search(name);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/discount',
async (req, res, next) => {
    try {
      const rta = await service.discount();
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/lastadds',
async (req, res, next) => {
    try {
      const rta = await service.lastAdds();
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recentviews',
async (req, res, next) => {
    try {
      const arr = req.body;
      const rta = await service.recentViews(arr);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;