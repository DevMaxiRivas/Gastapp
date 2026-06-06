import { z } from 'zod';

const LoginSchema = z.object({
    email: z.email(),
    password: z.string().min(8).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
});

export default LoginSchema;