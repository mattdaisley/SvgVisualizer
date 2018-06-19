const classes = [
  { 
    name: 'Board', 
    methods: [ 
      { name: 'draw', calls: [ 
        { class: 'CanvasStore', method: 'getCanvas' },
        { class: 'CanvasStore', method: 'getCtx' },
        { class: 'CanvasStore', method: 'getHitCtx' },
        { class: 'CanvasStore', method: 'getView' },
        { class: 'Square', method: 'render' },
        { class: 'CanvasStore', method: 'getConnections' },
        { class: 'Connection', method: 'render' },
        { class: 'CanvasStore', method: 'getObjects' },
        { class: 'MethodObject', method: 'render' },
        { class: 'CanvasStore', method: 'getDraggingObjects' },
        { class: 'MethodObject', method: 'renderHit' },
      ] },
      { name: 'setClasses' },
      { name: 'addClassObject' },
      { name: 'addMethodObject' },
    ]
  },
  { 
    name: 'CanvasStore', 
    methods: [ 
      { name: 'getCanvas', calls: [
        
      ]},
      { name: 'setObjectHitColor', calls: [
        
      ]},
      { name: 'getNewObjectGUID', calls: [
        
      ]},
      { name: 'registerObject', calls: [
        { class: 'CanvasStore', method: 'setObjectHitColor' },
        { class: 'CanvasStore', method: 'getNewObjectGUID' },
        { class: 'CanvasObject', method: 'setStoreGUID' },
      ]},
      { name: 'registerRelationship', calls: [
        { class: 'CanvasStore', method: 'registerObject' }
      ]},
      { name: 'getCanvas' },
      { name: 'getCtx' },
      { name: 'getHitCanvas' },
      { name: 'getHitCtx' },
      { name: 'getView' },
      { name: 'getObjects' },
      { name: 'getConncections' },
      { name: 'getDraggingObjects' },
      { name: 'registerRelationship' },
    ]
  },
  { 
    name: 'MethodObject', 
    methods: [ 
      { name: 'render', calls: []}, 
    ]
  },
  { 
    name: 'Connection', 
    methods: [ 
      { name: 'render', calls: []}, 
    ]
  },
  { 
    name: 'CanvasObject',
    methods: [ 
      { name: 'setStoreGUID', calls: [ 

      ]}, 
    ]
  }
];

export default classes;