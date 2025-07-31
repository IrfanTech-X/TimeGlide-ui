#include <stdio.h>
#include <stdlib.h>
#ifdef _WIN32
    #include <windows.h>
#else
    #include <unistd.h>
#endif

void delay(int milliseconds) {
#ifdef _WIN32
    Sleep(milliseconds);
#else
    usleep(milliseconds * 1000);
#endif
}

void clear_screen() {
#ifdef _WIN32
    system("cls");
#else
    system("clear");
#endif
}

int main() {
    int h, m, s;
    int d = 1000; // 1000 ms = 1 sec

    printf("╔════════════════════════════════════╗\n");
    printf("║    Welcome to Your Digital Clock   ║\n");
    printf("╚════════════════════════════════════╝\n\n");
    printf("→ Please set the current time (hh mm ss): ");
    scanf("%d %d %d", &h, &m, &s);

    if (h > 23 || m > 59 || s > 59) {
        printf("\n✖ ERROR: Invalid time format! Use 24-hour format.\n");
        exit(1);
    }

    while (1) {
        clear_screen();
        printf("╔════════════════════════════════╗\n");
        printf("║       ⏰ DIGITAL CLOCK ⏰        ║\n");
        printf("╠════════════════════════════════╣\n");
        printf("║          %02d : %02d : %02d           ║\n", h, m, s);
        printf("╚════════════════════════════════╝\n");

        delay(d);
        s++;

        if (s > 59) {
            s = 0;
            m++;
        }
        if (m > 59) {
            m = 0;
            h++;
        }
        if (h > 23) {
            h = 0;
        }
    }

    return 0;
}
