export default {
  data() {
    return {
      token: '',
    };
  },
  created() {
    if (!localStorage.getItem('user')) alert('NO USER IN LS');
    this.token = JSON.parse(localStorage.getItem('user'));
  },
  methods: {
    dateFormatter(t) {
      let date = new Date(t);
      return date.toLocaleDateString();
    },
    getHeaders() {
      const headers = {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.token.token,
      };
      return headers;
    },
  },
};
