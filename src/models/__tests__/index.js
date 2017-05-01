const test = require('ava');

const Model = require('../index');

const Sample = Object.assign({
  data: [{
    id: 1,
    name: 'sample 1 aaa',
    keywords: ['1st', 'first', '一番目', '最初'],
  }, {
    id: 2,
    name: 'sample 2 aab',
    keywords: ['2nd', 'second', '二番目'],
  }, {
    id: 3,
    name: 'sample 3 aac',
    keywords: ['3rd', 'third', '三番目'],
  }, {
    id: 4,
    name: 'sample 4 abb',
    keywords: ['4th', 'fourth', '四番目'],
  }, {
    id: 5,
    name: 'sample 5 abc',
    keywords: ['5th', 'fifth', '五番目', '最後'],
  }],
  schema: {
    id: {
      type: 'number',
    },
    name: {
      type: 'string',
    },
    keywords: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
}, Model);

test('Model.all', t => {
  const samples = Sample.all();

  t.true(Sample.valid(samples));
  t.is(samples.length, 5);
});

test('Model.where(object)', t => {
  let samples = null;

  samples = Sample.where({id: 1});

  t.true(Sample.valid(samples));
  t.is(samples.length, 1);

  samples = Sample.where({id: 2});

  t.true(Sample.valid(samples));
  t.is(samples.length, 1);

  samples = Sample.where({id: 20});

  t.true(Sample.valid(samples));
  t.is(samples.length, 0);
});

test('Model.where(func)', t => {
  let samples = null;

  samples = Sample.where((entity) => {
    return 2 <= entity.id && entity.id < 4;
  });

  t.true(Sample.valid(samples));
  t.is(samples.length, 2);
});

test('Model.find(object)', t => {
  const sample = Sample.find({id: 1});

  t.true(Sample.valid(sample));
  t.deepEqual(sample, {
    id: 1,
    name: 'sample 1 aaa',
    keywords: ['1st', 'first', '一番目', '最初'],
  });
});

test('Model.search', t => {
  let samples = null;

  samples = Sample.search();

  t.true(Sample.valid(samples));
  t.is(samples.length, 0);

  samples = Sample.search('5');

  t.true(Sample.valid(samples));
  t.is(samples.length, 1);
  t.deepEqual(samples[0], {
    id: 5,
    name: 'sample 5 abc',
    keywords: ['5th', 'fifth', '五番目', '最後'],
  });

  samples = Sample.search('zamp 34 ab');

  t.true(Sample.valid(samples));
  t.is(samples.length, 5);
  t.deepEqual(samples.map(sample => {
    return sample.id;
  }), [4, 3, 5, 1, 2]);

  samples = Sample.search('rd');

  t.true(Sample.valid(samples));
  t.is(samples.length, 4);
  t.deepEqual(samples.map(sample => {
    return sample.id;
  }), [3, 1, 2, 4]);
});
