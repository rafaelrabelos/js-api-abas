import { Router } from 'express';
import { RoutersModel } from '@domain/models/index';
import { VendasService } from '@app/services/VendasService';

const router = Router({
  strict: false,
});

const vendasServicce = new VendasService();

router.get('/', vendasServicce.CreateVenda)

const vendasRouter: RoutersModel = {
  Version: '/v1',
  Prefix: '/vendas',
  Routes: router,
};

export { vendasRouter as VendasControllers };
