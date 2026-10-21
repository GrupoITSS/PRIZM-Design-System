# Lê a cor de um pixel de um PNG (sem dependências). Uso: python3 -I px.py imagem.png [x] [y]
# Padrão: x=5, y=meio da imagem. Imprime: largura altura [r, g, b(, a)].
# Para conferir no render do servidor (get_screenshot) se a opacidade de um fill gravou.
import zlib,struct,sys
d=open(sys.argv[1],'rb').read()
w,h=struct.unpack('>II',d[16:24]); ct=d[25]
idat=b''; i=8
while i<len(d):
    l=struct.unpack('>I',d[i:i+4])[0]; t=d[i+4:i+8]
    if t==b'IDAT': idat+=d[i+8:i+8+l]
    i+=12+l
raw=zlib.decompress(idat); bpp=4 if ct==6 else 3; stride=w*bpp
rows=[];prev=bytearray(stride);p=0
for y in range(h):
    f=raw[p];p+=1;line=bytearray(raw[p:p+stride]);p+=stride
    for x in range(stride):
        a=line[x-bpp] if x>=bpp else 0;b=prev[x];c=prev[x-bpp] if x>=bpp else 0
        if f==1:line[x]=(line[x]+a)&255
        elif f==2:line[x]=(line[x]+b)&255
        elif f==3:line[x]=(line[x]+(a+b)//2)&255
        elif f==4:
            pa,pb,pc=abs(b-c),abs(a-c),abs(a+b-2*c)
            pr=a if pa<=pb and pa<=pc else (b if pb<=pc else c);line[x]=(line[x]+pr)&255
    rows.append(line);prev=line
x=int(sys.argv[2]) if len(sys.argv)>2 else 5
y=int(sys.argv[3]) if len(sys.argv)>3 else h//2
print(w,h,list(rows[y][x*bpp:x*bpp+bpp]))
