namespace M404_Snake_Gerber_Lars
{
    partial class Form1
    {
        /// <summary>
        /// Erforderliche Designervariable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Verwendete Ressourcen bereinigen.
        /// </summary>
        /// <param name="disposing">True, wenn verwaltete Ressourcen gelöscht werden sollen; andernfalls False.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Vom Windows Form-Designer generierter Code

        /// <summary>
        /// Erforderliche Methode für die Designerunterstützung.
        /// Der Inhalt der Methode darf nicht mit dem Code-Editor geändert werden.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.btnStart = new System.Windows.Forms.Button();
            this.btnRestart = new System.Windows.Forms.Button();
            this.pnlPlayGround = new System.Windows.Forms.Panel();
            this.pnlSnakeHead = new System.Windows.Forms.PictureBox();
            this.gameTimer = new System.Windows.Forms.Timer(this.components);
            this.countdownTimer = new System.Windows.Forms.Timer(this.components);
            this.lblCountdown = new System.Windows.Forms.Label();
            this.countdownBox = new System.Windows.Forms.Label();
            this.punkteBox = new System.Windows.Forms.Label();
            this.lblPunkte = new System.Windows.Forms.Label();
            this.statusMessage = new System.Windows.Forms.Label();
            this.lblScore = new System.Windows.Forms.Label();
            this.highScoreList = new System.Windows.Forms.TextBox();
            this.btnSafeScore = new System.Windows.Forms.Button();
            this.pnlPlayGround.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pnlSnakeHead)).BeginInit();
            this.SuspendLayout();
            // 
            // btnStart
            // 
            this.btnStart.Location = new System.Drawing.Point(12, 546);
            this.btnStart.Name = "btnStart";
            this.btnStart.Size = new System.Drawing.Size(70, 30);
            this.btnStart.TabIndex = 0;
            this.btnStart.Text = "Start";
            this.btnStart.UseVisualStyleBackColor = true;
            this.btnStart.Click += new System.EventHandler(this.btnStart_Click);
            // 
            // btnRestart
            // 
            this.btnRestart.Location = new System.Drawing.Point(99, 546);
            this.btnRestart.Name = "btnRestart";
            this.btnRestart.Size = new System.Drawing.Size(70, 30);
            this.btnRestart.TabIndex = 1;
            this.btnRestart.Text = "Reset";
            this.btnRestart.UseVisualStyleBackColor = true;
            this.btnRestart.Click += new System.EventHandler(this.btnRestart_Click);
            // 
            // pnlPlayGround
            // 
            this.pnlPlayGround.BackColor = System.Drawing.SystemColors.Window;
            this.pnlPlayGround.Controls.Add(this.pnlSnakeHead);
            this.pnlPlayGround.Location = new System.Drawing.Point(12, 31);
            this.pnlPlayGround.Margin = new System.Windows.Forms.Padding(0);
            this.pnlPlayGround.Name = "pnlPlayGround";
            this.pnlPlayGround.Size = new System.Drawing.Size(500, 500);
            this.pnlPlayGround.TabIndex = 3;
            // 
            // pnlSnakeHead
            // 
            this.pnlSnakeHead.BackColor = System.Drawing.SystemColors.Window;
            this.pnlSnakeHead.BackgroundImageLayout = System.Windows.Forms.ImageLayout.None;
            this.pnlSnakeHead.ErrorImage = null;
            this.pnlSnakeHead.InitialImage = null;
            this.pnlSnakeHead.Location = new System.Drawing.Point(0, 0);
            this.pnlSnakeHead.Margin = new System.Windows.Forms.Padding(0);
            this.pnlSnakeHead.MaximumSize = new System.Drawing.Size(20, 20);
            this.pnlSnakeHead.MinimumSize = new System.Drawing.Size(20, 20);
            this.pnlSnakeHead.Name = "pnlSnakeHead";
            this.pnlSnakeHead.Size = new System.Drawing.Size(20, 20);
            this.pnlSnakeHead.SizeMode = System.Windows.Forms.PictureBoxSizeMode.Zoom;
            this.pnlSnakeHead.TabIndex = 1;
            this.pnlSnakeHead.TabStop = false;
            // 
            // gameTimer
            // 
            this.gameTimer.Tick += new System.EventHandler(this.GameTimer_Tick);
            // 
            // countdownTimer
            // 
            this.countdownTimer.Interval = 1000;
            this.countdownTimer.Tick += new System.EventHandler(this.countdownTimer_Tick);
            // 
            // lblCountdown
            // 
            this.lblCountdown.AutoSize = true;
            this.lblCountdown.Location = new System.Drawing.Point(538, 106);
            this.lblCountdown.Name = "lblCountdown";
            this.lblCountdown.Size = new System.Drawing.Size(64, 13);
            this.lblCountdown.TabIndex = 6;
            this.lblCountdown.Text = "Countdown:";
            // 
            // countdownBox
            // 
            this.countdownBox.AutoSize = true;
            this.countdownBox.BackColor = System.Drawing.Color.White;
            this.countdownBox.Location = new System.Drawing.Point(613, 101);
            this.countdownBox.Margin = new System.Windows.Forms.Padding(0);
            this.countdownBox.MinimumSize = new System.Drawing.Size(39, 23);
            this.countdownBox.Name = "countdownBox";
            this.countdownBox.Padding = new System.Windows.Forms.Padding(10, 5, 10, 5);
            this.countdownBox.Size = new System.Drawing.Size(39, 23);
            this.countdownBox.TabIndex = 9;
            this.countdownBox.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // punkteBox
            // 
            this.punkteBox.AutoSize = true;
            this.punkteBox.BackColor = System.Drawing.Color.White;
            this.punkteBox.Location = new System.Drawing.Point(613, 62);
            this.punkteBox.Margin = new System.Windows.Forms.Padding(0);
            this.punkteBox.MinimumSize = new System.Drawing.Size(39, 23);
            this.punkteBox.Name = "punkteBox";
            this.punkteBox.Padding = new System.Windows.Forms.Padding(10, 5, 10, 5);
            this.punkteBox.Size = new System.Drawing.Size(39, 23);
            this.punkteBox.TabIndex = 10;
            this.punkteBox.Text = "0";
            this.punkteBox.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lblPunkte
            // 
            this.lblPunkte.AutoSize = true;
            this.lblPunkte.Location = new System.Drawing.Point(546, 67);
            this.lblPunkte.Name = "lblPunkte";
            this.lblPunkte.Size = new System.Drawing.Size(44, 13);
            this.lblPunkte.TabIndex = 11;
            this.lblPunkte.Text = "Punkte:";
            // 
            // statusMessage
            // 
            this.statusMessage.AutoSize = true;
            this.statusMessage.Location = new System.Drawing.Point(9, 9);
            this.statusMessage.Name = "statusMessage";
            this.statusMessage.Size = new System.Drawing.Size(274, 13);
            this.statusMessage.TabIndex = 12;
            this.statusMessage.Text = "Sammle innerhalb von 20 Sekunden die meisten Punkte!";
            // 
            // lblScore
            // 
            this.lblScore.AutoSize = true;
            this.lblScore.Location = new System.Drawing.Point(538, 147);
            this.lblScore.Name = "lblScore";
            this.lblScore.Size = new System.Drawing.Size(62, 13);
            this.lblScore.TabIndex = 14;
            this.lblScore.Text = "Punkteliste:";
            // 
            // highScoreList
            // 
            this.highScoreList.BackColor = System.Drawing.SystemColors.Control;
            this.highScoreList.Enabled = false;
            this.highScoreList.Location = new System.Drawing.Point(541, 173);
            this.highScoreList.Multiline = true;
            this.highScoreList.Name = "highScoreList";
            this.highScoreList.Size = new System.Drawing.Size(135, 312);
            this.highScoreList.TabIndex = 15;
            // 
            // btnSafeScore
            // 
            this.btnSafeScore.Location = new System.Drawing.Point(541, 498);
            this.btnSafeScore.Name = "btnSafeScore";
            this.btnSafeScore.Size = new System.Drawing.Size(135, 23);
            this.btnSafeScore.TabIndex = 16;
            this.btnSafeScore.Text = "Punkte in Liste einragen";
            this.btnSafeScore.UseVisualStyleBackColor = true;
            this.btnSafeScore.Click += new System.EventHandler(this.btnSafeScore_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(691, 610);
            this.Controls.Add(this.btnSafeScore);
            this.Controls.Add(this.lblScore);
            this.Controls.Add(this.statusMessage);
            this.Controls.Add(this.lblPunkte);
            this.Controls.Add(this.punkteBox);
            this.Controls.Add(this.countdownBox);
            this.Controls.Add(this.lblCountdown);
            this.Controls.Add(this.pnlPlayGround);
            this.Controls.Add(this.btnRestart);
            this.Controls.Add(this.btnStart);
            this.Controls.Add(this.highScoreList);
            this.Name = "Form1";
            this.ShowIcon = false;
            this.Text = "Snake - friss den Apfel";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.pnlPlayGround.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.pnlSnakeHead)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button btnStart;
        private System.Windows.Forms.Button btnRestart;
        private System.Windows.Forms.Timer gameTimer;
        public System.Windows.Forms.Panel pnlPlayGround;
        private System.Windows.Forms.Timer countdownTimer;
        private System.Windows.Forms.Label lblCountdown;
        private System.Windows.Forms.Label countdownBox;
        private System.Windows.Forms.Label punkteBox;
        private System.Windows.Forms.Label lblPunkte;
        private System.Windows.Forms.Label statusMessage;
        private System.Windows.Forms.Label lblScore;
        private System.Windows.Forms.TextBox highScoreList;
        private System.Windows.Forms.Button btnSafeScore;
        private System.Windows.Forms.PictureBox pnlSnakeHead;
    }
}

