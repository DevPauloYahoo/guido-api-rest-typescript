import { ProfileRepository } from '../auth';
import { Profile } from '../entities';

export const createProfiles = async () => {
  const count = await ProfileRepository.count();

  if (count > 0) {
    return;
  }

  const p1 = new Profile();
  p1.name = 'PRO_ADMIN';
  p1.description = 'Perfil de administrador do sistema';

  const p2 = new Profile();
  p2.name = 'PRO_USER';

  p2.description = 'Perfil de usuário do sistema';
  const p3 = new Profile();

  p3.name = 'PRO_CONVIDADO';
  p3.description = 'Perfil de convidado do sistema';

  const values = await Promise.all([p1, p2, p3]);

  await ProfileRepository.createQueryBuilder()
    .insert()
    .into(Profile)
    .values(values)
    .execute();
};
