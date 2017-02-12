/**
 * Created by Iulian Moldovan on 11/02/2017.
 */

export function foo(req, res) {
  res.send('Authorization not required!');
}

export function bar(req, res) {
  res.send('You are authorized to see this response!');
}
