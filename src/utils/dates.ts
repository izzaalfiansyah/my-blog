function getMonth(index: number, length: number | undefined = undefined) {
  return [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ][index].substring(0, length);
}

export function dateFormat(date: string | Date) {
  if (typeof date == "string") {
    date = new Date(date);
  }

  return (
    date.getDate().toString() +
    " " +
    getMonth(date.getMonth(), 3) +
    " " +
    date.getFullYear()
  );
}
