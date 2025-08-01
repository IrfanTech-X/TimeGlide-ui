#include <stdio.h>
int main ()
{

    int h,m,s;
    int d = 1000;
    printf("Welcome to the 24h-formatted Digital Clock\n");
    printf("Set the Current time with hr:min:sec : \n");
    scanf("%d%d%d", &h,&m,&s);
    if(h>23 || m>60 || s>60)
    {
        printf("ERROR ! \n");
        exit(0);
    }
    while(1)
    {
        s++;
        if(s>59)
        {
            m++;
            s=0;
        }
        if(m>59)
        {
            h++;
            m=0;
        }
        if(h>23)
        {
            h=0;
        }
        printf("\n Clock : ");
        printf("\n %02d: %02d: %02d",h,m,s);
        Sleep(d);
        system("cls");
    }

return 0;

}
