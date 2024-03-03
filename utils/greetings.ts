import { ExtendedUser } from "@/next-auth"

export function returnGreetings(userName: ExtendedUser["name"]) {
  const time = new Date().getHours()

  let greetings
  if (time >= 5 && time < 12) {
    greetings = "Bom dia,"
  } else if (time >= 12 && time < 18) {
    greetings = "Boa tarde,"
  } else {
    greetings = "Boa noite,"
  }

  return greetings + " " + userName + "!"
}
