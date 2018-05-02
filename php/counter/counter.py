from hashlib import md5
from http.server import HTTPServer, SimpleHTTPRequestHandler
from os import urandom
from sqlite3 import Connection, Cursor, connect as SQLConnect
from time import time
from typing import Dict, Optional


def gen_cookie() -> str:
    return md5(urandom(512)).hexdigest()


class DB:
    def __init__(self, dbs: str=':memory:'):
        self._dbs = dbs
        self._conn = None  # type: Connection
        self._cursor = None  # type: Cursor

        self._connect()

    def _connect(self) -> None:
        self._conn = SQLConnect(self._dbs)
        self._cursor = self._conn.cursor()

        self._cursor.execute('CREATE TABLE IF NOT EXISTS Counters(ids TEXT NOT NULL, last_update INTEGER NOT NULL)')
        self._conn.commit()

    def __del__(self):
        self._conn.close()

    def update(self, ids: str) -> None:
        curs = self._cursor

        cur_time = int(time())

        last_update = curs.execute(
            'SELECT last_update FROM Counters WHERE ids=:ids',
            dict(ids=ids),
        ).fetchone()

        if last_update is None:
            curs.execute(
                'INSERT INTO Counters(ids, last_update) VALUES(:ids, :cur)',
                dict(ids=ids, cur=cur_time),
            )
        else:
            curs.execute(
                'UPDATE OR FAIL Counters SET ids=:ids, last_update=:last_update WHERE ids=:ids',
                dict(ids=ids, last_update=cur_time),
            )

        self._conn.commit()

    def total_active(self) -> int:
        cur_time = int(time())

        counter, = self._cursor.execute(
            'SELECT COUNT(ids) FROM Counters WHERE last_update > :time',
            dict(time=cur_time - 60),
        ).fetchone()

        if counter is None:
            counter = 0

        return counter


class Cookie:
    def __init__(self, raw: Optional[str]=None):
        self._raw = raw
        self._data = {}  # type: Dict[str, str]

        self._parse()

    def _parse(self) -> None:
        if self._raw is None:
            return

        for item in self._raw.split(';'):
            item = item.strip()
            try:
                key, value = item.split('=')
            except ValueError:
                key = item
                value = ''

            self._data[key] = value

    def get(self, key: str) -> Optional[str]:
        return self._data.get(key, None)

    def set(self, key: str, value: str) -> None:
        self._data[key] = value

    def to_string(self, k: Optional[str]=None) -> str:
        if k is None:
            data = []
            for key, value in self._data.items():
                data.append('{k}={v}'.format(k=key, v=value))
            ret = '; '.join(data)
        else:
            ret = '{k}={v}'.format(k=k, v=self._data[k])

        return ret


class IndexHandler(SimpleHTTPRequestHandler):
    db = None # type: DB

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def do_GET(self) -> None:
        cookies = Cookie(self.headers.get('Cookie'))
        ids = cookies.get('id')

        self.send_response(200)
        self.send_header('Content-type', 'text/html; charset=UTF-8')

        if ids is None:
            cur_cookie = Cookie()
            cur_cookie.set('id', gen_cookie())
            ids = cur_cookie.get('id')

            self.send_header('Set-Cookie', cur_cookie.to_string('id'))

        self.end_headers()

        self.db.update(ids)

        data = '<center>Online: {}</center>'.format(self.db.total_active())

        self.wfile.write(data.encode())


def main():
    IndexHandler.db = DB()

    with HTTPServer(('127.0.0.1', 8080), IndexHandler) as server:
        server.serve_forever()


if __name__ == '__main__':
    main()
