import jwt from 'jsonwebtoken'

export const generateToken = (userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: '1d',
  })

  return token
}
