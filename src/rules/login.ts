export const emailRules: any = [
  (v: string) => {
    if (!v) {
      return "email harus diisi";
    }

    return true;
  },
  (v: string) => {
    if (v.indexOf("@") < 0) {
      return "email tidak valid";
    }

    return true;
  },
];

export const passwordRules: any = [
  (v: string) => {
    if (!v) {
      return "password harus diisi";
    }

    return true;
  },
];
