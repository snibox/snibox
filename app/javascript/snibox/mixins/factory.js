export default {
  methods: {
    factory() {
      return {
        snippet: {
          id: null,
          title: '',
          description: '',
          label: {
            id: -1,
            name: '',
            snippets_count: 0
          },
          snippet_files: [{
            title: '',
            content: '',
            language: 'automatically',
            tabs: 4,
          }]
        }
      }
    }
  }
}
