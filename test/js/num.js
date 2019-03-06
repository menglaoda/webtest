function num(number){
	var randoms=[];
	while (true)
	{
	    var isExists = false;
	    // 获取一个10–100范围的数
	    var random = parseInt(number* (Math.random()))
	    // 判断当前随机数是否已经存在
	    for (var i = 0; i < randoms.length; i++) {
	        if (random === randoms[i]) {
	            isExists = true;
	            break;
	        }
	    }
	    // 如果不存在，则添加进去
	    if (!isExists)
	        randoms.push(random);
	    // 如果有10位随机数了，就跳出
	    if (randoms.length === 30)
	        break;
	}
	return randoms;
}
