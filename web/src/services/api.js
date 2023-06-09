export function loadLists() {
    return [
      { 
        title: 'Backlog', 
        creatable: true,
        cards: [
          {
            id: 1,
            content: 'Estudar módulo 01 de NodeJS',
            labels: ['#3b5bfd'],
            user: 'https://api.adorable.io/avatars/285/abott@adorable.png'
          },
          {
            id: 2,
            content: 'Criar vídeo para o Youtube ensinando a recriar a interface do Pipefy',
            labels: ['#3b5bfd'],
            user: 'https://api.adorable.io/avatars/285/abott@adorable.png'
          },
          {
            id: 3,
            content: 'Estudar módulo 03 de React Native',
            labels: ['#3b5bfd'],
            user: 'https://api.adorable.io/avatars/285/abott@adorable.png'
          },
          {
            id: 4,
            content: 'Gravar Aula "NextJS: Utilizando server-side rendering com ReactJS"',
            labels: ['#3490d1'],
            user: 'https://api.adorable.io/avatars/285/abott@adorable.png'
          },
          {
            id: 5,
            content: 'Gravar testes e deploy ReactJS',
            labels: ['#3490d1'],
            user: 'https://api.adorable.io/avatars/285/abott@adorable.png'
          },
        ]
      },
      { 
        title: 'Em andamento', 
        creatable: false,
        cards: [
           {
             id: 6,
             content: 'Recriando clone do Pipefy',
             labels: [],
             user: 'https://api.adorable.io/avatars/285/abott@adorable.png'
           }
        ]
      },
      { 
        title: 'Revisão/Aprovação', 
        creatable: false,
        cards: [
          {
            id: 7,
            content: 'Gravar sobre Geolocalização e mapas com React Native',
            labels: ['#3b5bfd'],
            user: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnnu6obVk9X7KpF7ddIVK0Xukk7GK5uWC1GA&usqp=CAU'
          },
          {
            id: 8,
            content: 'Gravar testes e deploy ReactJS',
            labels: ['#fc0505'],
            user: 'https://api.adorable.io/avatars/285/abott@adorable.png'
          },
          {
            id: 9,
            content: 'Ajustes na biblioteca unform',
            labels: [],
          }
        ]
      },
      { 
        title: 'Deploy', 
        creatable: false,      
        cards: [
          {
            id: 10,
            content: 'Gravar aula sobre deploy e CI com React Native',
            labels: [],
          },
          {
            id: 12,
            content: 'Gravar testes e deploy ReactJS',
            labels: ['#3490d1'],
          },
          {
            id: 13,
            content: 'Gravar Aula "Internacionalização de aplicações Node.js, ReactJS e React Native"',
            labels: ['#3b5bfd'],
          }
        ]
      },

      ,
      { 
        title: 'Arquivado', 
        creatable: false,
        done: true,
        cards: [
          {
            id: 10,
            content: 'Gravar aula sobre deploy e CI com React Native',
            labels: [],
          },
          {
            id: 12,
            content: 'Gravar testes e deploy ReactJS',
            labels: ['#3490d1'],
          },
          {
            id: 13,
            content: 'Gravar Aula "Internacionalização de aplicações Node.js, ReactJS e React Native"',
            labels: ['#3b5bfd'],
          }
        ]
      },
      
    ];
  }