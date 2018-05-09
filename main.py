import os
import mammoth

value = input("请输入需要转换的docx(包括路径): ")

if value.rfind(".docx") == -1:
    print('请选择docx文件')
else:
    position = value.find(".docx")
    name = value[:position]
    name = name[name.rfind("/") + 1:]

    docx = open(value,"rb")
    result = mammoth.convert_to_html(docx)
    html = result.value

    w = open("./client/assets/word/opt/%s.js"%(name), "w")

    w.write("let result = '%s'\n\nexport default result"%html)
