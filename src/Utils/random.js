const abc = 'abcdefghijklmnopqrstuvwxyz';
const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const _123 = '0123456789';
const symbol = '~!@#$%^&*()_+{}|:"<>?`-=[]\\;\'./';

const { max, min, random, pow, floor } = Math;

export function number(_from, _to, type = 'int', repeat = true, count = 1, point = 2) {
  if (_from !== 0 && !_form) throw 'Please enter the range.';
  if (_to !== 0 && !_to) throw 'Please enter the range.';
  const [from, to] = [min(_from, _to), max(_from, _to)];

  const payload = [];

  if (type === 'int') {
    if (!repeat && to - from < count) throw 'There is not enough different number.';
    const range = to - from + 1;
    while (payload.length < count) {
      const num = floor(random() * range + from);
      if (!repeat && payload.indexOf(num) !== -1) continue;
      payload.push(num);
    }
  }

  if (type === 'float') {
    const range = (to - from) * pow(10, point) + 1;
    if (!repeat && range < count) throw 'There is not enough different number.';

    while (payload.length < count) {
      const num = floor(random() * range) + from * pow(10, point);
      if (!repeat && payload.indexOf(num) !== -1) continue;
      payload.push(num / pow(10, point));
    }
  }

  return payload;
}

export function string(payload, length, count) {
  const randomString = (p, l) => {
    let str = '';
    for (let i = 0; i < l; ++i) {
      const random_index = floor(random() * p.length);
      str += p[random_index];
    }
    return str;
  };

  const arr = [];
  for (let i = 0; i < count; ++i) {
    const s = randomString(payload, length);
    arr.push(s);
  }

  return arr;
}
