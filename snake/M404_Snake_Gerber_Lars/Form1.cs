using System;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;

namespace M404_Snake_Gerber_Lars
{

    public partial class Form1 : Form
    {
        private int RichtungX = 0;
        private int RichtungY = 0;
        private int score = 0;
        private const int APPLE_SIZE = 30;
        private int growTicksCount = 0;
        private const int TOTAL_COUNTDOWN_TIME = 20;
        private int countdownTimeInSeconds = TOTAL_COUNTDOWN_TIME;
        private List<KeyValuePair<Apple, PictureBox>> applePictureBoxList = new List<KeyValuePair<Apple, PictureBox>>();
        private List<PictureBox> bodyShapePictureBoxList = new List<PictureBox>();

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            drawAllApples();
            pnlSnakeHead.Image = Properties.Resources.SchlangenKopfRechts;
        }

        private void btnStart_Click(object sender, EventArgs e)
        {
            btnStart.Enabled = false;
            gameTimer.Start();
            countdownTimer.Start();
            RichtungX = pnlSnakeHead.Width;
        }

        private void btnRestart_Click(object sender, EventArgs e)
        {
            gameTimer.Stop();
            pnlSnakeHead.Location = new Point(0);
            RichtungX = pnlSnakeHead.Width;
            RichtungY = 0;
            score = 0;
            btnStart.Enabled = true;
            statusMessage.Text = "Sammle innerhalb von 20 Sekunden die meisten Punkte!";
            countdownTimer.Stop();
            clearCountdownBox();
            countdownTimeInSeconds = TOTAL_COUNTDOWN_TIME;
            updateScoreBox();
            drawAllApples();
            pnlSnakeHead.Image = Properties.Resources.SchlangenKopfRechts;
            gameTimer.Interval = 100;
            bodyShapePictureBoxList.ForEach(pnlPlayGround.Controls.Remove);
            bodyShapePictureBoxList.Clear();
            growTicksCount = 0;
        }

        private void btnSafeScore_Click(object sender, EventArgs e)
        {
            if (score > 0 && !gameTimer.Enabled)
            {
                highScoreList.Text += score + Environment.NewLine;
                score = 0;
            }
        }

        private void drawAllApples()
        {
            foreach (var pair in applePictureBoxList)
            {
                var pictureBox = pair.Value;
                pnlPlayGround.Controls.Remove(pictureBox);
            }
            applePictureBoxList.Clear();
            applePictureBoxList.Add(placeApple(createAppleBox()));
            applePictureBoxList.Add(placeApple(createAppleBox()));
            applePictureBoxList.Add(placeApple(createAppleBox()));
            applePictureBoxList.Add(placeApple(createAppleBox()));
            applePictureBoxList.Add(placeApple(createAppleBox()));
            applePictureBoxList.Add(placeApple(createAppleBox()));
            applePictureBoxList.Add(placeApple(createAppleBox()));
            applePictureBoxList.Add(placeApple(createAppleBox()));
            applePictureBoxList.Add(placeApple(createAppleBox()));
            applePictureBoxList.Add(placeApple(createAppleBox()));
        }

        private void clearCountdownBox()
        {
            countdownBox.Text = "";
        }

        private void GameTimer_Tick(object sender, EventArgs e)
        {
            updateCountdownBox();
            checkAndEatApple(pnlSnakeHead.Bounds);

            if (!playgroundBorderReached(pnlSnakeHead.Location))
            {
                moveSnake();
                moveSnakeAnimation();
            }
            updateScoreBox();
        }

        private void moveSnakeAnimation()
        {
            createSnakeBody();

            if (growTicksCount > 0)
            {
                growTicksCount = growTicksCount - 1;
            }
            else
            {
                pnlPlayGround.Controls.Remove(bodyShapePictureBoxList[bodyShapePictureBoxList.Count - 1]);
                bodyShapePictureBoxList.RemoveAt(bodyShapePictureBoxList.Count - 1);
            }
        }

        private PictureBox createSnakeBody()
        {
            var pictureBoxBody = new PictureBox
            {
                Location = new Point(pnlSnakeHead.Location.X - RichtungX, pnlSnakeHead.Location.Y - RichtungY),
                Margin = new Padding(0),
                MaximumSize = new Size(pnlSnakeHead.Width, pnlSnakeHead.Height),
                MinimumSize = new Size(pnlSnakeHead.Width, pnlSnakeHead.Height),
                Size = new Size(pnlSnakeHead.Width, pnlSnakeHead.Height),
                SizeMode = PictureBoxSizeMode.Zoom,
                Image = getSnakeTile(),
                TabStop = false
            };
   
            bodyShapePictureBoxList.Insert(0, pictureBoxBody);
            pnlPlayGround.Controls.Add(pictureBoxBody);
            
            return pictureBoxBody;
        }

        private Image getSnakeTile()
        {
            if (RichtungY == 0)
            {
                return Properties.Resources.SchlangeHorizontal;
            }
            else
            {
                return Properties.Resources.SchlangeVertikal;
            }
        }

        private void checkAndEatApple(Rectangle snakeHead)
        {
            foreach (var pair in applePictureBoxList)
            {
                var apple = pair.Key;
                var applePictureBox = pair.Value;
                if (!apple.eaten && applePictureBox.Bounds.IntersectsWith(snakeHead))
                {
                    apple.eat();
                    applePictureBox.Hide();
                    score += apple.points;
                    growTicksCount += apple.points;
                    gameTimer.Interval = Math.Max(gameTimer.Interval - apple.points, 10);
                }
            }
        }

        private void updateScoreBox()
        {
            punkteBox.Text = $"{score}";
        }

        private void countdownTimer_Tick(object sender, EventArgs e)
        {
            reduceCountdown();

            if (countdownTimeInSeconds == 0)
            {
                stopGame();
                countdownTimer.Stop();
                updateCountdownBox();
            }
        }

        private void reduceCountdown()
        {
            if (countdownTimeInSeconds > 0)
            {
                countdownTimeInSeconds = countdownTimeInSeconds - 1;
            }
        }

        private void updateCountdownBox()
        {
            countdownBox.Text = $"{countdownTimeInSeconds}";
        }

        private bool playgroundBorderReached(Point currentPoint)
        {
            //Oben
            if (currentPoint.Y < 0)
            {
                return true;
            }
            //Unten
            if (currentPoint.Y > pnlPlayGround.Height - pnlSnakeHead.Height)
            {
                return true;
            }
            //Links
            if (currentPoint.X < 0)
            {
                return true;
            }
            //Rechts
            if (currentPoint.X > pnlPlayGround.Width - pnlSnakeHead.Width)
            {
                return true;
            }
            return false;
        }

        private void stopGame()
        {
            gameTimer.Stop();
            statusMessage.Text = "Das Spiel ist vorbei!";
        }

        private void moveSnake()
        {
            Point nextPoint = new Point(pnlSnakeHead.Location.X + RichtungX, pnlSnakeHead.Location.Y + RichtungY);
            
            if (playgroundBorderReached(nextPoint) || didIBiteMyself(nextPoint))
            {
                stopGame();
                return;
            }
            pnlSnakeHead.Location = nextPoint;
        }

        private bool didIBiteMyself(Point nextHeadPosition)
        {
            var nextHeadRectangle = new Rectangle(nextHeadPosition, new Size(pnlSnakeHead.Width, pnlSnakeHead.Height));
            var didBite = false;

            bodyShapePictureBoxList.ForEach(delegate(PictureBox bodyPart)
            {
                if (bodyPart.Bounds.IntersectsWith(nextHeadRectangle))
                {
                    didBite = true;
                    return;
                }
            });
            return didBite;
        }

        protected override bool ProcessDialogKey(Keys keyData)
        {
            
            if (gameTimer.Enabled && keyData == Keys.Up)
            {
                changeDirection("ho");
                pnlSnakeHead.Image = Properties.Resources.SchlangenKopfOben;
                return true;
            }
            else if (gameTimer.Enabled && keyData == Keys.Down)
            {
                changeDirection("ru");
                pnlSnakeHead.Image = Properties.Resources.SchlangenKopfUnten;
                return true;
            }
            else if (gameTimer.Enabled && keyData == Keys.Right)
            {
                changeDirection("re");
                pnlSnakeHead.Image = Properties.Resources.SchlangenKopfRechts;
                return true;
            }
            else if (gameTimer.Enabled && keyData == Keys.Left)
            {
                changeDirection("li");
                pnlSnakeHead.Image = Properties.Resources.SchlangenKopfLinks;
                return true;
            }
            else return base.ProcessDialogKey(keyData);
        }

        private void changeDirection(String richtung)
        {
            switch (richtung)
            {
                case "ho":
                    RichtungY = -pnlSnakeHead.Height;
                    RichtungX = 0;
                    break;

                case "ru":
                    RichtungY = pnlSnakeHead.Height;
                    RichtungX = 0;
                    break;

                case "re":
                    RichtungY = 0;
                    RichtungX = pnlSnakeHead.Width;
                    break;

                case "li":
                    RichtungY = 0;
                    RichtungX = -pnlSnakeHead.Width;
                    break;
            }
        }

        private PictureBox createAppleBox()
        {
            var pictureBox = new PictureBox
            {
                Location = new Point(0, pnlPlayGround.Width - APPLE_SIZE),
                Margin = new Padding(0),
                MaximumSize = new Size(APPLE_SIZE, APPLE_SIZE),
                MinimumSize = new Size(APPLE_SIZE, APPLE_SIZE),
                Size = new Size(APPLE_SIZE, APPLE_SIZE),
                SizeMode = PictureBoxSizeMode.Zoom,
                Image = Properties.Resources.Apfel,
                TabStop = false
            };
            this.pnlPlayGround.Controls.Add(pictureBox);
            return pictureBox;
        }

        private KeyValuePair<Apple, PictureBox> placeApple(PictureBox pictureBox)
        {
            //var apple = new Apple(20, 471, 2, 11);
            var apple = new Apple(20, 471, 2, 11);
            pictureBox.Image = getAppleImage(apple);
            pictureBox.Location = apple.Location;
            pictureBox.Show();
            return new KeyValuePair<Apple, PictureBox>(apple, pictureBox);
        }

        private Image getAppleImage(Apple apple)
        {
            switch (apple.points)
            {
                case 2:
                    return Properties.Resources.Apfel2;

                case 3:
                    return Properties.Resources.Apfel3;

                case 4:
                    return Properties.Resources.Apfel4;

                case 5:
                    return Properties.Resources.Apfel5;

                case 6:
                    return Properties.Resources.Apfel6;

                case 7:
                    return Properties.Resources.Apfel7;

                case 8:
                    return Properties.Resources.Apfel8;

                case 9:
                    return Properties.Resources.Apfel9;

                case 10:
                    return Properties.Resources.Apfel10;

                default:
                    return Properties.Resources.Apfel;
            }
        }
    }

    public class Apple
    {
        private static Random rnd = new Random();

        public int points { get; private set; }

        public bool eaten { get; private set; } = false;

        public Point Location { get; private set; }

        public Apple(int minXYPointInclusive, int maxXYPointExclusive, int minimalPoints, int maxPointsExclusive)
        {
            this.Location = new Point(rnd.Next(minXYPointInclusive, maxXYPointExclusive), rnd.Next(minXYPointInclusive, maxXYPointExclusive));
            this.points = rnd.Next(minimalPoints, maxPointsExclusive);
        }

        public void eat()
        {
            this.eaten = true;
        }
    }
}


/*
 
Tag         Datum       Stunden
Montag      06.05.2019	1
Freitag	    10.05.2019	5
Samstag	    11.05.2019	3
Montag	    13.05.2019	2
Mittwoch    15.05.2019	8
Donnerstag	16.05.2019	8
Freitag	    17.05.2019	8
Montag	    20.05.2019	2
Mittwoch	22.05.2019	8
Donnerstag  23.05.2019  3
Freitag     24.05.2019  X

Montag      27.05.2019  2
---------------------------
Gesamtheit:	         	58

Das ganze Projekt wurde von mir allein erstellt. Ich habe den ganzen Code mit meinen eigenen Händen eingetippt.
Ich bestätige, dass ich nichts aus dem Internet kopiert habe. Eine Quelle für Hilfestellungen waren die alten Projekte vom Modul 403 und 404.
Gelegentlich habe ich einen Befehl auf Stackoverflow nachgeschaut. Dies ist natürlich am richtigen Ort vermerkt.
Ich habe bei meinem Progeramm manchmal Hilfestellungen aus meinem Team in der Firma bekommen.
Ich unterteile die stärke der Hilfe in drei Stufen:
Hilfe 1 = Ich habe einen mündlichen Tipp bekommen.
Hilfe 2 = Ich habe anhand eines beispiels eine Erklärung bekommen.
Hilfe 3 = Ich habe von einem der zwei Helfern aus meinem Team eine Nachhilfelektion bekommen.

*/
