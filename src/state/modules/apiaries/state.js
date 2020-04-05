export default function() {
  return {
    apiary: {},
    editing: false,
    apiaries: [
      {
        id: 1,
        title: 'Backyard',
        city: 'Driebergen',
        lastvisit: 'today',
        hives: [
          {
            id: 1,
            honey: 4,
            brood: 2,
            frames: 10,
            color: 'red',
          },
          {
            id: 2,
            honey: 1,
            brood: 3,
            frames: 15,
            color: 'purple',
          },
        ],
        photo: true,
        warning: true,
      },
      {
        id: 2,
        title: 'Garden',
        city: 'Utrecht',
        lastvisit: 'yesterday',
        hives: [
          {
            id: 3,
            honey: 2,
            brood: 2,
            frames: 5,
            color: 'green',
          },
          {
            id: 4,
            honey: 1,
            brood: 5,
            frames: 15,
            color: 'brown',
          },
          {
            id: 5,
            honey: 1,
            brood: 5,
            frames: 15,
            color: 'brown',
          },
          {
            id: 6,
            honey: 1,
            brood: 5,
            frames: 15,
            color: 'brown',
          },
          {
            id: 7,
            honey: 1,
            brood: 5,
            frames: 15,
            color: 'brown',
          },
          {
            id: 8,
            honey: 1,
            brood: 5,
            frames: 15,
            color: 'brown',
          },
          {
            id: 9,
            honey: 1,
            brood: 5,
            frames: 15,
            color: 'brown',
          },
          {
            id: 10,
            honey: 1,
            brood: 5,
            frames: 15,
            color: 'brown',
          },
          {
            id: 11,
            honey: 1,
            brood: 5,
            frames: 15,
            color: 'brown',
          },
          {
            id: 12,
            honey: 1,
            brood: 5,
            frames: 15,
            color: 'brown',
          },
        ],
        photo: true,
      },
      {
        id: 3,
        title: 'Lakeside',
        city: 'Madison',
        lastvisit: 'last week',
        hives: [
          {
            id: 13,
            honey: 2,
            brood: 2,
            frames: 10,
            color: 'cyan',
          },
          {
            id: 14,
            honey: 1,
            brood: 3,
            frames: 15,
            color: 'blue',
          },
        ],
        photo: true,
        warning: true,
        shared: true,
      },
      {
        id: 4,
        title: 'Mountain',
        city: 'Geneva',
        lastvisit: '3 months ago',
        hives: [
          {
            id: 15,
            honey: 2,
            brood: 2,
            frames: 10,
            color: 'orange',
          },
          {
            id: 16,
            honey: 1,
            brood: 3,
            frames: 15,
            color: 'yellow',
          },
          {
            id: 17,
            honey: 2,
            brood: 2,
            frames: 15,
            color: 'yellow',
          },
          {
            id: 18,
            honey: 5,
            brood: 3,
            frames: 10,
            color: 'red',
          },
          {
            id: 19,
            honey: 2,
            brood: 2,
            frames: 15,
            color: 'deep-purple',
          },
          {
            id: 20,
            honey: 5,
            brood: 3,
            frames: 10,
            color: 'red',
          },
        ],
        shared: true,
      },
    ],
    inspections: [
      {
        id: 1,
        apiary: 'Backyard',
        hive: 1,
        date: '2020-01-08',
        impression: -1,
        attention: 1,
        reminder: '2020-02-01',
        note: 'replace battery',
      },
      {
        id: 2,
        apiary: 'Garden',
        hive: 6,
        date: '2020-01-06',
        impression: 1,
        note: 'put extra layer on top',
        reminder: '2020-02-01',
      },
      {
        id: 3,
        apiary: 'Lakeside',
        date: '2019-12-23',
        attention: 1,
        note: 'beez are humming!',
        reminder: '2020-02-01',
      },
      {
        id: 4,
        apiary: 'Backyard',
        hive: 2,
        date: '2019-11-08',
        reminder: '2020-02-01',
      },
      {
        id: 5,
        apiary: 'Garden',
        date: '2019-06-01',
        impression: 0,
        note: 'not sure what the mould means',
        reminder: '2020-02-01',
      },
      {
        id: 6,
        apiary: 'Garden',
        hive: 5,
        date: '2019-04-21',
        attention: 1,
        reminder: '2020-02-01',
      },
      {
        id: 7,
        apiary: 'Garden',
        date: '2019-01-06',
        impression: 2,
        attention: 1,
        reminder: '2020-02-01',
      },
      {
        id: 8,
        apiary: 'Backyard',
        hive: 1,
        date: '2020-01-08',
        impression: -1,
        attention: 1,
        reminder: '2020-02-01',
        note: 'replace battery',
      },
      {
        id: 9,
        apiary: 'Garden',
        hive: 6,
        date: '2020-01-06',
        impression: 1,
        note: 'put extra layer on top',
        reminder: '2020-02-01',
      },
      {
        id: 10,
        apiary: 'Lakeside',
        date: '2019-12-23',
        attention: 1,
        note: 'beez are humming!',
        reminder: '2020-02-01',
      },
      {
        id: 17,
        apiary: 'Garden',
        date: '2019-01-06',
        impression: 2,
        attention: 1,
        reminder: '2020-02-01',
      },
      {
        id: 18,
        apiary: 'Backyard',
        hive: 1,
        date: '2020-01-08',
        impression: -1,
        attention: 1,
        reminder: '2020-02-01',
        note: 'replace battery',
      },
      {
        id: 19,
        apiary: 'Garden',
        hive: 6,
        date: '2020-01-06',
        impression: 1,
        note: 'put extra layer on top',
        reminder: '2020-02-01',
      },
      {
        id: 10,
        apiary: 'Lakeside',
        date: '2019-12-23',
        attention: 1,
        note: 'beez are humming!',
        reminder: '2020-02-01',
      },
      {
        id: 11,
        apiary: 'Backyard',
        hive: 2,
        date: '2019-11-08',
        reminder: '2020-02-01',
      },
      {
        id: 12,
        apiary: 'Garden',
        date: '2019-06-01',
        impression: 0,
        note: 'not sure what the mould means',
        reminder: '2020-02-01',
      },
      {
        id: 13,
        apiary: 'Garden',
        hive: 5,
        date: '2019-04-21',
        attention: 1,
        reminder: '2020-02-01',
      },
      {
        id: 14,
        apiary: 'Garden',
        date: '2019-01-06',
        impression: 2,
        attention: 1,
        reminder: '2020-02-01',
      },
    ],
  }
}