export default {
  methods: {
    dateFormatter(t) {
      let date = new Date(t);
      return date.toLocaleDateString();
    },
  },
};
