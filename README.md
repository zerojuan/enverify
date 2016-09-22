# enverify

Keeps your environment variables accurate

- Prevents typos
- Prevents missing variables
- Prevents accidentally using the same value twice

```
npm install -g enverify
```

```
enverify ./conf
```

## env.conf properties

For exceptions, enverify looks at an `env.conf` in the root of the specified folder. *Warning: using exceptions is code smell*

### duplicable
- array of keys that can have the same values in multiple environments

### optional
- array of keys that may not exist in other environments

Example:
```
{
  "duplicable": [ "logstash.ip", "context" ],
  "optional": [ "context", "logLevel" ]
}
```
