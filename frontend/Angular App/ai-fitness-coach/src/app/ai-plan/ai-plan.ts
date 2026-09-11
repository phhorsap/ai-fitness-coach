import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ai-plan',
  imports: [DecimalPipe, FormsModule],
  templateUrl: './ai-plan.html',
  styleUrl: './ai-plan.scss',
})
export class AiPlan {
  preferredFoods = 'ลาบไก่, แกงจืด, ไก่ต้มหัวปลา';
  caloriesPerDay = 1800;
  weeklyTarget = 7;
  breakfastPortion = 350;
  lunchPortion = 600;
  dinnerPortion = 650;
  generatedAt = 'ยังไม่ได้สร้าง';

  weekMeals = [
    {
      name: 'วันจันทร์',
      meals: [
        { time: 'เช้า', title: 'โอทเมอัล + ไข่ 2 ฟอง + ส้ม', calories: '420 kcal' },
        { time: 'กลางวัน', title: 'สลัดไก่กรีล + ข้าวกล้อง', calories: '560 kcal' },
        { time: 'เย็น', title: 'ปลาแซลมอน + ถั่วลันเตา + ผัก', calories: '620 kcal' },
      ],
    },
    {
      name: 'วันอังคาร',
      meals: [
        { time: 'เช้า', title: 'โยเกิร์ตรสธรรมชาติ + granola', calories: '390 kcal' },
        { time: 'กลางวัน', title: 'สเต็กไก่ + ข้าวหอมมะลิ + ผัก', calories: '610 kcal' },
        { time: 'เย็น', title: 'ก๋วยเตี๋ยวเส้นเล็ก + ผัก + ไก่', calories: '580 kcal' },
      ],
    },
    {
      name: 'วันพุธ',
      meals: [
        { time: 'เช้า', title: 'ข้าวโอ๊ต + นม + บลูเบอร์รี่', calories: '430 kcal' },
        { time: 'กลางวัน', title: 'เมนูซูชิกุ้ง + สลัดผัก', calories: '540 kcal' },
        { time: 'เย็น', title: 'ซุปมิโซ + เต้าหู้ + ผักใบเขียว', calories: '500 kcal' },
      ],
    },
    {
      name: 'วันพฤหัสบดี',
      meals: [
        { time: 'เช้า', title: 'แซนด์วิชไข่กวน + มะละกอ', calories: '410 kcal' },
        { time: 'กลางวัน', title: 'กระเพาะปลา + ข้าว + ผัก', calories: '570 kcal' },
        { time: 'เย็น', title: 'อกไก่ย่าง + มันเทศ + ผัก', calories: '640 kcal' },
      ],
    },
    {
      name: 'วันศุกร์',
      meals: [
        { time: 'เช้า', title: 'นมถั่วเหลือง + ขนมปังโฮลวีต', calories: '360 kcal' },
        { time: 'กลางวัน', title: 'ข้าวไรซ์เบอรี่ + ไก่ต้ม + ผัก', calories: '590 kcal' },
        { time: 'เย็น', title: 'สเต็กกุ้ง + ราดหน้าแอปเปิ้ล', calories: '620 kcal' },
      ],
    },
    {
      name: 'วันเสาร์',
      meals: [
        { time: 'เช้า', title: 'ไข่คน + ขนมปัง + สตรอว์เบอร์รี', calories: '440 kcal' },
        { time: 'กลางวัน', title: 'สลัดทูน่า + ขนมปังโฮลวีต', calories: '550 kcal' },
        { time: 'เย็น', title: 'หมูย่าง + ผักโขม + ข้าวกล้อง', calories: '660 kcal' },
      ],
    },
    {
      name: 'วันอาทิตย์',
      meals: [
        { time: 'เช้า', title: 'สมูทตี้บลูเบอร์รี่ + อะโวคาโด', calories: '380 kcal' },
        { time: 'กลางวัน', title: 'สเต็กปลา + ข้าวโพด + ผัก', calories: '580 kcal' },
        { time: 'เย็น', title: 'ไก่ผัดมะเขือเทศ + ข้าวหอม', calories: '610 kcal' },
      ],
    },
  ];

  shoppingList = [
    { title: 'โปรตีน', items: ['อกไก่', 'กุ้ง', 'ปลาแซลมอน', 'ไข่', 'เต้าหู้', 'หมู'] },
    { title: 'ผัก', items: ['ผักโขม', 'บล็อคโคลี่', 'แตงกวา', 'มะเขือเทศ', 'ผักใบเขียว'] },
    { title: 'ธัญพืช / คาร์โบไฮเดรต', items: ['ข้าวกล้อง', 'ข้าวหอมมะลิ', 'ข้าวโอ๊ต', 'ขนมปังโฮลวีต', 'มันเทศ'] },
    { title: 'ผลไม้', items: ['ส้ม', 'แอปเปิ้ล', 'สตรอว์เบอร์รี', 'กล้วย', 'มะละกอ'] },
    { title: 'ของใช้ในบ้าน', items: ['โยเกิร์ต', 'นม', 'น้ำมันมะกอก', 'ถั่วลันเตา', 'ซีอิ๊วเจียว'] },
  ];

  budgetBreakdown = [
    { category: 'โปรตีน', amount: 32, store: 'Aldi / Lidl / Kaufland' },
    { category: 'ผักและผลไม้', amount: 18, store: 'Markt / Wochenmarkt' },
    { category: 'ธัญพืชและคาร์โบ', amount: 14, store: 'Lidl / Aldi' },
    { category: 'นมและของแช่', amount: 11, store: 'Aldi / Rewe' },
    { category: 'เครื่องปรุง', amount: 7, store: 'Lidl / Kaufland' },
  ];

  storeTips = [
    {
      name: 'Lidl',
      reason: 'คุ้มสุดสำหรับอาหารหลักและของใช้ในครัวแบบประหยัด',
      saving: 'ประหยัดกว่า 10-15%',
    },
    {
      name: 'Aldi',
      reason: 'ราคาถูกสำหรับผลไม้ ผัก และสินค้าอุปโภคบริโภคพื้นฐาน',
      saving: 'ประหยัดกว่า 8-12%',
    },
    {
      name: 'Kaufland',
      reason: 'เหมาะกับการซื้อแบบรวมและสินค้าใกล้เคียงสุขภาพมากกว่า',
      saving: 'ประหยัดกว่า 5-10%',
    },
    {
      name: 'Wochenmarkt (ตลาดสัปดาห์)',
      reason: 'ซื้อผักและผลไม้สดจากตลาดท้องถิ่นมักถูกกว่า supermarket มาก',
      saving: 'ประหยัดกว่า 12-18%',
    },
  ];

  get totalBudget(): number {
    return this.budgetBreakdown.reduce((sum, item) => sum + item.amount, 0);
  }

  get cheapestStore(): string {
    return 'Wochenmarkt + Lidl';
  }

  generateWeeklyMenu(): void {
    this.generatedAt = new Date().toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const keywords = this.preferredFoods
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const fallbackDishes = ['ลาบไก่', 'แกงจืด', 'ไก่ต้มหัวปลา', 'ไข่เจียว', 'ส้ม'];
    const dishPool = keywords.length ? keywords : fallbackDishes;

    const dayNames = ['วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์', 'วันอาทิตย์'];

    const breakfastSuggestions = ['ข้าวโอ๊ต + ไข่ + ผลไม้', 'โจ๊ก + ไข่ + เเคล', 'โยเกิร์ต + ขนมปัง + ผลไม้'];
    const lunchSuggestions = ['ลาบไก่ + ผักสด + ข้าว', 'แกงจืด + ข้าว', 'ไก่ต้มหัวปลา + ผัก'];
    const dinnerSuggestions = ['ไก่ย่าง + ผัก + ข้าว', 'ต้มยำไก่ + ผัก', 'ผัดผัก + ไก่ + ข้าว'];

    const selectedDishes = dishPool.map((dish) => dish.replace(/\s+/g, ''));

    this.weekMeals = dayNames.map((dayName, index) => {
      const breakfast = breakfastSuggestions[index % breakfastSuggestions.length];
      const lunch = lunchSuggestions[(index + 1) % lunchSuggestions.length];
      const dinner = dinnerSuggestions[(index + 2) % dinnerSuggestions.length];

      const focusDish = selectedDishes[index % selectedDishes.length] || 'ลาบไก่';
      const lunchDish = focusDish.includes('ลาบ') ? 'ลาบไก่ + ผัก + ข้าว' : lunch;
      const dinnerDish = focusDish.includes('แกง') ? 'แกงจืด + ผัก + ข้าว' : dinner;

      const breakfastCalories = Math.max(250, Math.round(this.breakfastPortion || 350));
      const lunchCalories = Math.max(400, Math.round(this.lunchPortion || 600));
      const dinnerCalories = Math.max(450, Math.round(this.dinnerPortion || 650));

      const meals = [
        {
          time: 'เช้า',
          title: breakfast,
          calories: `${breakfastCalories} kcal`,
        },
        {
          time: 'กลางวัน',
          title: lunchDish,
          calories: `${lunchCalories} kcal`,
        },
        {
          time: 'เย็น',
          title: dinnerDish,
          calories: `${dinnerCalories} kcal`,
        },
      ];

      return {
        name: dayName,
        meals,
      };
    });

    if (this.weeklyTarget > 0) {
      this.weekMeals = this.weekMeals.slice(0, Math.min(this.weeklyTarget, 7));
    }
  }
}
