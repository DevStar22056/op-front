export default function (user) {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
    appUuid: user.appUuid,
    token: user.token,
    uuid: user.uuid,
    machineDetection: user.machineDetection,
    forwardSoftphone: user.forwardSoftphone,
    numbers: user.numbers && user.numbers.map(elem => ({
      number: elem.number,
      type: { id: elem.type.id }
    }))
  }
}
