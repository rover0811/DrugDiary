import { useEffect } from "react";
import Realm from "realm";

const CALLBACK_HOST = "http://localhost:3000";
const DELAY = 5000;
const schema = [{ name: "Person", properties: { name: "string" } }];
const Testing = () => {
  useEffect(() => {
    const realm = new Realm({ schema });
    // Write persons into the database
    if (realm.isEmpty) {
      realm.write(() => {
        realm.create("Person", { name: "Alice" });
        realm.create("Person", { name: "Bob" });
        realm.create("Person", { name: "Charlie" });
      });
    }
    // Read the persons out of the database again
    const message =
      "Persons are " +
      realm
        .objects("Person")
        .map((p) => p.name)
        .join(", ");
    console.log(`Sending '${message}'`);
    // Perform a request to signal a successful write & read
    setTimeout(() => {
      fetch(CALLBACK_HOST, {
        method: "POST",
        body: message,
      }).catch(console.error);
    }, DELAY);
    // Close the Realm when component unmounts
    return () => realm.close();
  }, []);
  return null;
};

export default Testing;
