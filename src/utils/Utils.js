import bcrypt from "bcryptjs";

export function capitalize(str) {
  return str?.charAt(0).toUpperCase() + str?.slice(1);
}

export function saltAndHashPassword(password) {
  const saltRounds = 10; // Adjust the cost factor according to your security requirements
  const salt = bcrypt.genSaltSync(saltRounds); // Synchronously generate a salt
  const hash = bcrypt.hashSync(password, salt); // Synchronously hash the password
  return hash; // Return the hash directly as a string
}

export function formatTanggal(tanggal){
  const date = new Date(tanggal);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('id-ID', options);
}

export function formatTanggalShort(tanggal){
  const date = new Date(tanggal);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('id-ID', options);
}

export function formatAgenda(tanggal){
  const date = new Date(tanggal);
  return date.toDateString('dd/MM/yyyy');
}

export function formatJam(tanggal) {
  const date = new Date(tanggal);
  const options = { hour: 'numeric', minute: 'numeric' };
  return date.toLocaleTimeString('id-ID', options).replace('.', ':');
}

export function formatTimeStamp(tanggal){
  const date = new Date(tanggal);
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return date.toLocaleDateString('id-ID', options).replaceAll('/', '').replaceAll(' ', '').replaceAll('.', '');
}