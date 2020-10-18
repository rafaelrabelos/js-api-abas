import { Router } from 'express';
import { RoutersModel } from '@domain/models/index';
import { VendedorService } from '@app/services';

const router = Router({
  strict: false,
});

const vendedorServicce = new VendedorService();

router.get('/', vendedorServicce.GetVendedores)
router.post('/', vendedorServicce.CreateVendedor)

const vendedorRouter: RoutersModel = {
  Version: '/v1',
  Prefix: '/vendedor',
  Routes: router,
};

export { vendedorRouter as VendedorControllers };
