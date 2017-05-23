var Mock = require('../lib/mock.js').Mock;
var Random = Mock.Random;
Mock.mock(/test/, {
    'errcode': 0,
    "list|10": [
    	{
    		'id' : '@id',
    		"name":"@cname",
    		"age|1-100": 1,
    		'url':'@url',
    		'detail':'@cparagraph',
    		'image':Random.image()
    	}
    ]
});