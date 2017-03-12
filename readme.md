# 查询12306车票信息

查询12306车票信息,可筛选过站

# Installation

```shell
$ npm install -g cticket
```

# Usage

```
  Usage: cticket [options] <from> <to> <date>

  查询12306车票信息,可筛选过站.
  eg: cticket beijing hangzhou 2017-02-28

  Options:

    -h, --help                output usage information
    -g, --gao                 高铁
    -d, --dong                动车
    -t, --te                  特快
    -k, --kuai                快速
    -z, --zhi                 直达
    --through <station name>  途径站
    -V, --version             output the version number

```

Example:

```shell
$ cticket beijin hangzhou 2017-04-10 --through shanghai
```

[demo](!)

# TODO

- 查询余票接口容灾方案
- 监听余票

# 注意

12306api地址可能会更换,引起报错
