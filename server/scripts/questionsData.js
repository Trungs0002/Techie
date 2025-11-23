// Real questions for each subject - 25 questions each
// Each subject has 15 multiple choice (4 options) + 10 true/false questions

module.exports = {
  // Cấu trúc dữ liệu và giải thuật
  CTDL: {
    multipleChoice: [
      {
        content: 'Độ phức tạp thời gian của thuật toán tìm kiếm nhị phân là gì?',
        options: [
          { text: 'O(n)', isCorrect: false },
          { text: 'O(log n)', isCorrect: true },
          { text: 'O(n²)', isCorrect: false },
          { text: 'O(n log n)', isCorrect: false }
        ],
        explanation: 'Tìm kiếm nhị phân chia đôi không gian tìm kiếm mỗi lần lặp nên có độ phức tạp O(log n)',
        difficulty: 'easy',
        tags: ['algorithm', 'complexity', 'search']
      },
      {
        content: 'Cấu trúc dữ liệu nào hoạt động theo nguyên tắc LIFO (Last In First Out)?',
        options: [
          { text: 'Queue', isCorrect: false },
          { text: 'Stack', isCorrect: true },
          { text: 'Array', isCorrect: false },
          { text: 'Linked List', isCorrect: false }
        ],
        explanation: 'Stack hoạt động theo nguyên tắc LIFO - phần tử cuối cùng vào sẽ ra đầu tiên',
        difficulty: 'easy',
        tags: ['data-structure', 'stack']
      },
      {
        content: 'Thuật toán sắp xếp nào có độ phức tạp trung bình tốt nhất O(n log n)?',
        options: [
          { text: 'Bubble Sort', isCorrect: false },
          { text: 'Selection Sort', isCorrect: false },
          { text: 'Quick Sort', isCorrect: true },
          { text: 'Insertion Sort', isCorrect: false }
        ],
        explanation: 'Quick Sort có độ phức tạp trung bình O(n log n), hiệu quả với dữ liệu lớn',
        difficulty: 'medium',
        tags: ['sorting', 'algorithm']
      },
      {
        content: 'Trong cây nhị phân tìm kiếm (BST), giá trị của node con bên trái so với node cha như thế nào?',
        options: [
          { text: 'Lớn hơn', isCorrect: false },
          { text: 'Nhỏ hơn', isCorrect: true },
          { text: 'Bằng nhau', isCorrect: false },
          { text: 'Không có quy tắc', isCorrect: false }
        ],
        explanation: 'Trong BST, node con trái luôn có giá trị nhỏ hơn node cha',
        difficulty: 'easy',
        tags: ['tree', 'bst']
      },
      {
        content: 'Thuật toán nào sử dụng kỹ thuật chia để trị (Divide and Conquer)?',
        options: [
          { text: 'Bubble Sort', isCorrect: false },
          { text: 'Linear Search', isCorrect: false },
          { text: 'Merge Sort', isCorrect: true },
          { text: 'Selection Sort', isCorrect: false }
        ],
        explanation: 'Merge Sort chia mảng thành các phần nhỏ, sắp xếp rồi gộp lại - điển hình của Divide and Conquer',
        difficulty: 'medium',
        tags: ['sorting', 'divide-conquer']
      },
      {
        content: 'Hash Table giải quyết collision bằng phương pháp nào?',
        options: [
          { text: 'Chaining hoặc Open Addressing', isCorrect: true },
          { text: 'Binary Search', isCorrect: false },
          { text: 'Sorting', isCorrect: false },
          { text: 'Linear Probing only', isCorrect: false }
        ],
        explanation: 'Hash Table có thể giải quyết collision bằng Chaining (danh sách liên kết) hoặc Open Addressing',
        difficulty: 'medium',
        tags: ['hash-table', 'collision']
      },
      {
        content: 'Độ cao của cây AVL với n nodes là gì?',
        options: [
          { text: 'O(n)', isCorrect: false },
          { text: 'O(log n)', isCorrect: true },
          { text: 'O(n²)', isCorrect: false },
          { text: 'O(1)', isCorrect: false }
        ],
        explanation: 'Cây AVL là cây cân bằng nên độ cao luôn là O(log n)',
        difficulty: 'medium',
        tags: ['tree', 'avl', 'balanced-tree']
      },
      {
        content: 'Thuật toán Dijkstra được sử dụng để tìm gì?',
        options: [
          { text: 'Cây khung nhỏ nhất', isCorrect: false },
          { text: 'Đường đi ngắn nhất', isCorrect: true },
          { text: 'Chu trình Euler', isCorrect: false },
          { text: 'Luồng cực đại', isCorrect: false }
        ],
        explanation: 'Dijkstra tìm đường đi ngắn nhất từ một đỉnh đến tất cả các đỉnh khác trong đồ thị có trọng số không âm',
        difficulty: 'medium',
        tags: ['graph', 'shortest-path', 'dijkstra']
      },
      {
        content: 'Độ phức tạp không gian của thuật toán Merge Sort là gì?',
        options: [
          { text: 'O(1)', isCorrect: false },
          { text: 'O(log n)', isCorrect: false },
          { text: 'O(n)', isCorrect: true },
          { text: 'O(n²)', isCorrect: false }
        ],
        explanation: 'Merge Sort cần thêm O(n) bộ nhớ để lưu mảng tạm trong quá trình gộp',
        difficulty: 'hard',
        tags: ['sorting', 'space-complexity']
      },
      {
        content: 'Trong thuật toán BFS (Breadth-First Search), cấu trúc dữ liệu nào được sử dụng?',
        options: [
          { text: 'Stack', isCorrect: false },
          { text: 'Queue', isCorrect: true },
          { text: 'Heap', isCorrect: false },
          { text: 'Hash Table', isCorrect: false }
        ],
        explanation: 'BFS sử dụng Queue để duyệt các đỉnh theo từng mức (level-order)',
        difficulty: 'easy',
        tags: ['graph', 'bfs', 'traversal']
      },
      {
        content: 'Heap là một loại cây gì?',
        options: [
          { text: 'Cây nhị phân hoàn chỉnh', isCorrect: true },
          { text: 'Cây nhị phân tìm kiếm', isCorrect: false },
          { text: 'Cây AVL', isCorrect: false },
          { text: 'Cây Red-Black', isCorrect: false }
        ],
        explanation: 'Heap là cây nhị phân hoàn chỉnh với tính chất: node cha lớn hơn/nhỏ hơn node con',
        difficulty: 'medium',
        tags: ['heap', 'tree']
      },
      {
        content: 'Độ phức tạp của thuật toán tìm kiếm tuyến tính (Linear Search) là gì?',
        options: [
          { text: 'O(1)', isCorrect: false },
          { text: 'O(log n)', isCorrect: false },
          { text: 'O(n)', isCorrect: true },
          { text: 'O(n log n)', isCorrect: false }
        ],
        explanation: 'Linear Search duyệt từng phần tử nên có độ phức tạp O(n)',
        difficulty: 'easy',
        tags: ['search', 'algorithm']
      },
      {
        content: 'Thuật toán nào sau đây là thuật toán tham lam (Greedy)?',
        options: [
          { text: 'Dynamic Programming', isCorrect: false },
          { text: "Prim's Algorithm", isCorrect: true },
          { text: 'Backtracking', isCorrect: false },
          { text: 'Brute Force', isCorrect: false }
        ],
        explanation: "Prim's Algorithm là thuật toán tham lam để tìm cây khung nhỏ nhất",
        difficulty: 'hard',
        tags: ['greedy', 'graph', 'mst']
      },
      {
        content: 'Trong Linked List, thao tác nào có độ phức tạp O(1)?',
        options: [
          { text: 'Tìm kiếm phần tử', isCorrect: false },
          { text: 'Thêm phần tử vào đầu', isCorrect: true },
          { text: 'Xóa phần tử ở giữa', isCorrect: false },
          { text: 'Truy cập phần tử thứ i', isCorrect: false }
        ],
        explanation: 'Thêm phần tử vào đầu Linked List chỉ cần thay đổi con trỏ head, độ phức tạp O(1)',
        difficulty: 'easy',
        tags: ['linked-list', 'complexity']
      },
      {
        content: 'Thuật toán Quick Sort có trường hợp xấu nhất là gì?',
        options: [
          { text: 'O(n)', isCorrect: false },
          { text: 'O(n log n)', isCorrect: false },
          { text: 'O(n²)', isCorrect: true },
          { text: 'O(log n)', isCorrect: false }
        ],
        explanation: 'Quick Sort có độ phức tạp O(n²) trong trường hợp xấu nhất khi pivot luôn là phần tử nhỏ nhất hoặc lớn nhất',
        difficulty: 'medium',
        tags: ['sorting', 'quick-sort', 'worst-case']
      }
    ],
    trueFalse: [
      {
        content: 'Stack có thể được cài đặt bằng Array hoặc Linked List',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Stack có thể được cài đặt bằng cả Array lẫn Linked List',
        difficulty: 'easy',
        tags: ['stack', 'implementation']
      },
      {
        content: 'Queue hoạt động theo nguyên tắc LIFO',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Queue hoạt động theo nguyên tắc FIFO (First In First Out), không phải LIFO',
        difficulty: 'easy',
        tags: ['queue', 'fifo']
      },
      {
        content: 'Bubble Sort là thuật toán sắp xếp ổn định (stable)',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Bubble Sort là thuật toán stable - giữ nguyên thứ tự tương đối của các phần tử bằng nhau',
        difficulty: 'medium',
        tags: ['sorting', 'stability']
      },
      {
        content: 'Cây AVL là một loại Binary Search Tree',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Cây AVL là BST có thêm điều kiện cân bằng (độ chênh lệch chiều cao ≤ 1)',
        difficulty: 'medium',
        tags: ['tree', 'avl', 'bst']
      },
      {
        content: 'DFS (Depth-First Search) sử dụng Queue để duyệt đồ thị',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'DFS sử dụng Stack (hoặc đệ quy), không phải Queue',
        difficulty: 'easy',
        tags: ['graph', 'dfs']
      },
      {
        content: 'Hash Table có thời gian truy cập trung bình là O(1)',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Hash Table có thời gian truy cập trung bình O(1) nhờ hàm băm',
        difficulty: 'easy',
        tags: ['hash-table', 'complexity']
      },
      {
        content: 'Tất cả các thuật toán sắp xếp đều có độ phức tạp tối thiểu là O(n log n)',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Counting Sort, Radix Sort có thể đạt O(n) trong một số trường hợp đặc biệt',
        difficulty: 'hard',
        tags: ['sorting', 'complexity']
      },
      {
        content: 'Binary Heap có thể được biểu diễn hiệu quả bằng Array',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Binary Heap thường được cài đặt bằng Array với công thức: con trái = 2i+1, con phải = 2i+2',
        difficulty: 'medium',
        tags: ['heap', 'implementation']
      },
      {
        content: 'Thuật toán Kruskal tìm đường đi ngắn nhất trong đồ thị',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Kruskal tìm cây khung nhỏ nhất (MST), không phải đường đi ngắn nhất',
        difficulty: 'medium',
        tags: ['graph', 'kruskal', 'mst']
      },
      {
        content: 'Circular Queue giúp sử dụng bộ nhớ hiệu quả hơn Queue thông thường',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Circular Queue tái sử dụng không gian đã giải phóng, hiệu quả hơn về bộ nhớ',
        difficulty: 'medium',
        tags: ['queue', 'circular-queue']
      }
    ]
  },

  // Lập trình hướng đối tượng
  OOP: {
    multipleChoice: [
      {
        content: 'Tính chất nào của OOP cho phép ẩn giấu thông tin chi tiết bên trong class?',
        options: [
          { text: 'Inheritance', isCorrect: false },
          { text: 'Encapsulation', isCorrect: true },
          { text: 'Polymorphism', isCorrect: false },
          { text: 'Abstraction', isCorrect: false }
        ],
        explanation: 'Encapsulation (đóng gói) cho phép ẩn giấu dữ liệu và chỉ cho phép truy cập qua các phương thức công khai',
        difficulty: 'easy',
        tags: ['oop', 'encapsulation']
      },
      {
        content: 'Từ khóa nào trong Java dùng để kế thừa từ một class khác?',
        options: [
          { text: 'implements', isCorrect: false },
          { text: 'extends', isCorrect: true },
          { text: 'inherits', isCorrect: false },
          { text: 'derives', isCorrect: false }
        ],
        explanation: 'Từ khóa "extends" được sử dụng để kế thừa từ một class trong Java',
        difficulty: 'easy',
        tags: ['java', 'inheritance']
      },
      {
        content: 'Overloading là gì trong OOP?',
        options: [
          { text: 'Ghi đè phương thức của class cha', isCorrect: false },
          { text: 'Định nghĩa nhiều phương thức cùng tên nhưng khác tham số', isCorrect: true },
          { text: 'Tạo nhiều object từ một class', isCorrect: false },
          { text: 'Kế thừa từ nhiều class', isCorrect: false }
        ],
        explanation: 'Method Overloading là việc định nghĩa nhiều phương thức cùng tên nhưng khác số lượng hoặc kiểu tham số',
        difficulty: 'medium',
        tags: ['oop', 'overloading']
      },
      {
        content: 'Access modifier nào trong Java hạn chế truy cập nhất?',
        options: [
          { text: 'public', isCorrect: false },
          { text: 'protected', isCorrect: false },
          { text: 'private', isCorrect: true },
          { text: 'default', isCorrect: false }
        ],
        explanation: 'private là access modifier hạn chế nhất - chỉ truy cập được trong cùng class',
        difficulty: 'easy',
        tags: ['java', 'access-modifier']
      },
      {
        content: 'Interface trong Java có thể chứa gì?',
        options: [
          { text: 'Chỉ abstract methods', isCorrect: false },
          { text: 'Abstract methods và default methods', isCorrect: true },
          { text: 'Chỉ concrete methods', isCorrect: false },
          { text: 'Private methods only', isCorrect: false }
        ],
        explanation: 'Từ Java 8, interface có thể chứa abstract methods, default methods, và static methods',
        difficulty: 'medium',
        tags: ['java', 'interface']
      },
      {
        content: 'Constructor trong Java có đặc điểm gì?',
        options: [
          { text: 'Phải có kiểu trả về', isCorrect: false },
          { text: 'Không có kiểu trả về và cùng tên với class', isCorrect: true },
          { text: 'Luôn là private', isCorrect: false },
          { text: 'Không thể overload', isCorrect: false }
        ],
        explanation: 'Constructor không có kiểu trả về và phải trùng tên với class',
        difficulty: 'easy',
        tags: ['java', 'constructor']
      },
      {
        content: 'Abstract class khác Interface ở điểm nào?',
        options: [
          { text: 'Abstract class không thể có method implementation', isCorrect: false },
          { text: 'Abstract class có thể có constructor và instance variables', isCorrect: true },
          { text: 'Interface có thể có constructor', isCorrect: false },
          { text: 'Không có sự khác biệt', isCorrect: false }
        ],
        explanation: 'Abstract class có thể có constructor, instance variables, và method implementation. Interface thì không',
        difficulty: 'medium',
        tags: ['oop', 'abstract', 'interface']
      },
      {
        content: 'Static method trong Java có đặc điểm gì?',
        options: [
          { text: 'Chỉ truy cập được instance variables', isCorrect: false },
          { text: 'Có thể gọi mà không cần tạo object', isCorrect: true },
          { text: 'Không thể overload', isCorrect: false },
          { text: 'Luôn là private', isCorrect: false }
        ],
        explanation: 'Static method thuộc về class, có thể gọi mà không cần tạo object',
        difficulty: 'easy',
        tags: ['java', 'static']
      },
      {
        content: 'Polymorphism runtime được thực hiện qua cơ chế nào?',
        options: [
          { text: 'Method Overloading', isCorrect: false },
          { text: 'Method Overriding', isCorrect: true },
          { text: 'Constructor Overloading', isCorrect: false },
          { text: 'Static Binding', isCorrect: false }
        ],
        explanation: 'Runtime Polymorphism được thực hiện thông qua Method Overriding và Dynamic Binding',
        difficulty: 'medium',
        tags: ['oop', 'polymorphism', 'overriding']
      },
      {
        content: 'Từ khóa "final" trong Java được sử dụng để làm gì?',
        options: [
          { text: 'Ngăn kế thừa hoặc ghi đè', isCorrect: true },
          { text: 'Tạo abstract class', isCorrect: false },
          { text: 'Định nghĩa interface', isCorrect: false },
          { text: 'Tạo static method', isCorrect: false }
        ],
        explanation: 'final ngăn class bị kế thừa, method bị override, hoặc variable bị thay đổi giá trị',
        difficulty: 'easy',
        tags: ['java', 'final']
      },
      {
        content: 'Composition khác Inheritance như thế nào?',
        options: [
          { text: 'Composition là "is-a", Inheritance là "has-a"', isCorrect: false },
          { text: 'Composition là "has-a", Inheritance là "is-a"', isCorrect: true },
          { text: 'Không có sự khác biệt', isCorrect: false },
          { text: 'Composition không dùng trong OOP', isCorrect: false }
        ],
        explanation: 'Composition biểu diễn quan hệ "has-a" (có), Inheritance biểu diễn "is-a" (là)',
        difficulty: 'medium',
        tags: ['oop', 'composition', 'inheritance']
      },
      {
        content: 'Design Pattern nào thuộc nhóm Creational Pattern?',
        options: [
          { text: 'Observer', isCorrect: false },
          { text: 'Singleton', isCorrect: true },
          { text: 'Strategy', isCorrect: false },
          { text: 'Adapter', isCorrect: false }
        ],
        explanation: 'Singleton là Creational Pattern, tập trung vào cách tạo object',
        difficulty: 'hard',
        tags: ['design-pattern', 'singleton']
      },
      {
        content: 'Trong Java, một class có thể kế thừa từ bao nhiêu class?',
        options: [
          { text: 'Không giới hạn', isCorrect: false },
          { text: 'Tối đa 1 class', isCorrect: true },
          { text: 'Tối đa 2 classes', isCorrect: false },
          { text: 'Tối đa 3 classes', isCorrect: false }
        ],
        explanation: 'Java chỉ hỗ trợ single inheritance - một class chỉ có thể kế thừa từ một class duy nhất',
        difficulty: 'easy',
        tags: ['java', 'inheritance']
      },
      {
        content: 'Garbage Collection trong Java hoạt động như thế nào?',
        options: [
          { text: 'Lập trình viên phải tự giải phóng bộ nhớ', isCorrect: false },
          { text: 'Tự động thu hồi bộ nhớ của object không còn được tham chiếu', isCorrect: true },
          { text: 'Chỉ hoạt động khi gọi System.gc()', isCorrect: false },
          { text: 'Không có garbage collection trong Java', isCorrect: false }
        ],
        explanation: 'JVM tự động thu hồi bộ nhớ của các object không còn được tham chiếu',
        difficulty: 'medium',
        tags: ['java', 'garbage-collection']
      },
      {
        content: 'SOLID principles trong OOP có bao nhiêu nguyên tắc?',
        options: [
          { text: '3', isCorrect: false },
          { text: '4', isCorrect: false },
          { text: '5', isCorrect: true },
          { text: '6', isCorrect: false }
        ],
        explanation: 'SOLID gồm 5 nguyên tắc: Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion',
        difficulty: 'hard',
        tags: ['oop', 'solid', 'principles']
      }
    ],
    trueFalse: [
      {
        content: 'Java hỗ trợ đa kế thừa (multiple inheritance) từ nhiều class',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Java không hỗ trợ multiple inheritance từ class, nhưng có thể implements nhiều interface',
        difficulty: 'easy',
        tags: ['java', 'inheritance']
      },
      {
        content: 'Encapsulation giúp tăng tính bảo mật của dữ liệu',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Encapsulation ẩn giấu dữ liệu và chỉ cho phép truy cập qua các phương thức công khai, tăng bảo mật',
        difficulty: 'easy',
        tags: ['oop', 'encapsulation']
      },
      {
        content: 'Abstract class có thể được khởi tạo (instantiate) trực tiếp',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Abstract class không thể được khởi tạo trực tiếp, chỉ có thể thông qua class con',
        difficulty: 'easy',
        tags: ['oop', 'abstract']
      },
      {
        content: 'Constructor có thể được kế thừa trong Java',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Constructor không được kế thừa, class con phải định nghĩa constructor riêng',
        difficulty: 'medium',
        tags: ['java', 'constructor']
      },
      {
        content: 'Interface có thể chứa instance variables',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Interface chỉ có thể chứa constants (public static final), không có instance variables',
        difficulty: 'medium',
        tags: ['java', 'interface']
      },
      {
        content: 'Method Overriding yêu cầu cùng method signature với method ở class cha',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Overriding yêu cầu cùng tên method, tham số và kiểu trả về với method ở class cha',
        difficulty: 'easy',
        tags: ['oop', 'overriding']
      },
      {
        content: 'Static method có thể truy cập instance variables',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Static method chỉ có thể truy cập static members, không thể truy cập instance variables',
        difficulty: 'medium',
        tags: ['java', 'static']
      },
      {
        content: 'Composition mang lại tính linh hoạt cao hơn Inheritance',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Composition linh hoạt hơn vì có thể thay đổi behavior tại runtime và tránh tight coupling',
        difficulty: 'hard',
        tags: ['oop', 'composition']
      },
      {
        content: 'Tất cả methods trong interface đều là public abstract',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Từ Java 8, interface có thể có default methods và static methods không phải abstract',
        difficulty: 'medium',
        tags: ['java', 'interface']
      },
      {
        content: 'Singleton Pattern đảm bảo chỉ có một instance của class trong toàn bộ ứng dụng',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Singleton Pattern giới hạn việc tạo object để chỉ có duy nhất một instance',
        difficulty: 'easy',
        tags: ['design-pattern', 'singleton']
      }
    ]
  },

  // ==================== NHÓM 1: DATABASE & BACKEND ====================
  
  // Cơ sở dữ liệu
  CSDL: {
    multipleChoice: [
      {
        content: 'SQL là viết tắt của gì?',
        options: [
          { text: 'Structured Query Language', isCorrect: true },
          { text: 'Simple Query Language', isCorrect: false },
          { text: 'Standard Query Language', isCorrect: false },
          { text: 'System Query Language', isCorrect: false }
        ],
        explanation: 'SQL (Structured Query Language) là ngôn ngữ truy vấn có cấu trúc dùng để quản lý và thao tác với cơ sở dữ liệu',
        difficulty: 'easy',
        tags: ['sql', 'basic']
      },
      {
        content: 'Khóa chính (Primary Key) có đặc điểm gì?',
        options: [
          { text: 'Có thể NULL', isCorrect: false },
          { text: 'Có thể trùng lặp', isCorrect: false },
          { text: 'Duy nhất và không NULL', isCorrect: true },
          { text: 'Chỉ áp dụng cho số', isCorrect: false }
        ],
        explanation: 'Primary Key phải duy nhất (unique) và không được NULL để đảm bảo định danh mỗi bản ghi',
        difficulty: 'easy',
        tags: ['database', 'primary-key']
      },
      {
        content: 'Lệnh SQL nào được dùng để lấy dữ liệu từ bảng?',
        options: [
          { text: 'GET', isCorrect: false },
          { text: 'SELECT', isCorrect: true },
          { text: 'FETCH', isCorrect: false },
          { text: 'RETRIEVE', isCorrect: false }
        ],
        explanation: 'SELECT là lệnh cơ bản trong SQL để truy vấn và lấy dữ liệu từ bảng',
        difficulty: 'easy',
        tags: ['sql', 'select']
      },
      {
        content: 'INNER JOIN trả về kết quả như thế nào?',
        options: [
          { text: 'Tất cả bản ghi từ cả hai bảng', isCorrect: false },
          { text: 'Chỉ bản ghi khớp ở cả hai bảng', isCorrect: true },
          { text: 'Tất cả bản ghi từ bảng trái', isCorrect: false },
          { text: 'Tất cả bản ghi từ bảng phải', isCorrect: false }
        ],
        explanation: 'INNER JOIN chỉ trả về các bản ghi có giá trị khớp ở cả hai bảng',
        difficulty: 'medium',
        tags: ['sql', 'join']
      },
      {
        content: 'Normalization trong database là gì?',
        options: [
          { text: 'Tăng tốc độ truy vấn', isCorrect: false },
          { text: 'Giảm redundancy và phụ thuộc dữ liệu', isCorrect: true },
          { text: 'Tăng dung lượng lưu trữ', isCorrect: false },
          { text: 'Mã hóa dữ liệu', isCorrect: false }
        ],
        explanation: 'Normalization là quá trình tổ chức dữ liệu để giảm thiểu redundancy và dependency anomalies',
        difficulty: 'medium',
        tags: ['database', 'normalization']
      },
      {
        content: 'Foreign Key được dùng để làm gì?',
        options: [
          { text: 'Tạo index cho bảng', isCorrect: false },
          { text: 'Liên kết hai bảng với nhau', isCorrect: true },
          { text: 'Mã hóa dữ liệu', isCorrect: false },
          { text: 'Sắp xếp dữ liệu', isCorrect: false }
        ],
        explanation: 'Foreign Key tham chiếu đến Primary Key của bảng khác để tạo mối quan hệ giữa các bảng',
        difficulty: 'easy',
        tags: ['database', 'foreign-key']
      },
      {
        content: 'ACID trong database đại diện cho những thuộc tính nào?',
        options: [
          { text: 'Access, Control, Integrity, Data', isCorrect: false },
          { text: 'Atomicity, Consistency, Isolation, Durability', isCorrect: true },
          { text: 'Authentication, Confidentiality, Integrity, Data', isCorrect: false },
          { text: 'Availability, Consistency, Integration, Distribution', isCorrect: false }
        ],
        explanation: 'ACID là Atomicity, Consistency, Isolation, Durability - 4 thuộc tính đảm bảo transaction đáng tin cậy',
        difficulty: 'medium',
        tags: ['database', 'acid', 'transaction']
      },
      {
        content: 'Index trong database có tác dụng gì?',
        options: [
          { text: 'Tăng dung lượng database', isCorrect: false },
          { text: 'Tăng tốc độ truy vấn', isCorrect: true },
          { text: 'Mã hóa dữ liệu', isCorrect: false },
          { text: 'Backup dữ liệu', isCorrect: false }
        ],
        explanation: 'Index giúp tăng tốc độ truy vấn bằng cách tạo cấu trúc dữ liệu đặc biệt để tìm kiếm nhanh hơn',
        difficulty: 'easy',
        tags: ['database', 'index', 'performance']
      },
      {
        content: 'NoSQL database khác SQL database ở điểm nào?',
        options: [
          { text: 'NoSQL không lưu được dữ liệu', isCorrect: false },
          { text: 'NoSQL không có schema cố định', isCorrect: true },
          { text: 'NoSQL chậm hơn SQL', isCorrect: false },
          { text: 'NoSQL không hỗ trợ transaction', isCorrect: false }
        ],
        explanation: 'NoSQL database thường có schema linh hoạt (schema-less) không bắt buộc cấu trúc cố định như SQL',
        difficulty: 'medium',
        tags: ['database', 'nosql', 'sql']
      },
      {
        content: 'MongoDB lưu trữ dữ liệu dưới dạng gì?',
        options: [
          { text: 'Tables và Rows', isCorrect: false },
          { text: 'Documents và Collections', isCorrect: true },
          { text: 'Files và Folders', isCorrect: false },
          { text: 'Arrays và Objects', isCorrect: false }
        ],
        explanation: 'MongoDB là NoSQL database lưu dữ liệu dưới dạng documents (JSON-like) trong collections',
        difficulty: 'easy',
        tags: ['mongodb', 'nosql']
      },
      {
        content: 'Transaction trong database đảm bảo điều gì?',
        options: [
          { text: 'Tốc độ truy vấn nhanh', isCorrect: false },
          { text: 'Tất cả thao tác thành công hoặc rollback', isCorrect: true },
          { text: 'Bảo mật dữ liệu', isCorrect: false },
          { text: 'Backup tự động', isCorrect: false }
        ],
        explanation: 'Transaction đảm bảo tính toàn vẹn: tất cả operations thành công hoặc rollback về trạng thái ban đầu',
        difficulty: 'medium',
        tags: ['database', 'transaction']
      },
      {
        content: 'LEFT JOIN khác INNER JOIN như thế nào?',
        options: [
          { text: 'LEFT JOIN nhanh hơn', isCorrect: false },
          { text: 'LEFT JOIN trả về tất cả bản ghi từ bảng trái', isCorrect: true },
          { text: 'LEFT JOIN chỉ dùng cho số', isCorrect: false },
          { text: 'Không có sự khác biệt', isCorrect: false }
        ],
        explanation: 'LEFT JOIN trả về tất cả bản ghi từ bảng trái kể cả khi không có match ở bảng phải',
        difficulty: 'medium',
        tags: ['sql', 'join']
      },
      {
        content: 'Stored Procedure là gì?',
        options: [
          { text: 'Một loại index', isCorrect: false },
          { text: 'Tập hợp các câu SQL được lưu sẵn', isCorrect: true },
          { text: 'Backup database', isCorrect: false },
          { text: 'Log file của database', isCorrect: false }
        ],
        explanation: 'Stored Procedure là tập hợp các câu lệnh SQL được biên dịch sẵn và lưu trong database để tái sử dụng',
        difficulty: 'medium',
        tags: ['database', 'stored-procedure']
      },
      {
        content: 'Trong SQL, GROUP BY được dùng để làm gì?',
        options: [
          { text: 'Sắp xếp dữ liệu', isCorrect: false },
          { text: 'Nhóm các hàng có giá trị giống nhau', isCorrect: true },
          { text: 'Lọc dữ liệu', isCorrect: false },
          { text: 'Join các bảng', isCorrect: false }
        ],
        explanation: 'GROUP BY nhóm các hàng có cùng giá trị và thường dùng với aggregate functions (COUNT, SUM, AVG...)',
        difficulty: 'easy',
        tags: ['sql', 'group-by']
      },
      {
        content: 'CAP theorem trong distributed database nói về gì?',
        options: [
          { text: 'Chỉ có thể đạt được 2 trong 3: Consistency, Availability, Partition tolerance', isCorrect: true },
          { text: 'Tất cả database phải có cả 3 thuộc tính', isCorrect: false },
          { text: 'Chỉ áp dụng cho SQL database', isCorrect: false },
          { text: 'Về hiệu suất của database', isCorrect: false }
        ],
        explanation: 'CAP theorem chỉ ra rằng distributed system chỉ có thể đảm bảo 2 trong 3: Consistency, Availability, Partition tolerance',
        difficulty: 'hard',
        tags: ['database', 'cap-theorem', 'distributed']
      }
    ],
    trueFalse: [
      {
        content: 'Một bảng có thể có nhiều Primary Key',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Một bảng chỉ có thể có một Primary Key (có thể composite key nhưng vẫn là một constraint)',
        difficulty: 'easy',
        tags: ['database', 'primary-key']
      },
      {
        content: 'Foreign Key có thể chứa giá trị NULL',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Foreign Key có thể chứa NULL nếu quan hệ không bắt buộc (optional relationship)',
        difficulty: 'medium',
        tags: ['database', 'foreign-key']
      },
      {
        content: 'DELETE và TRUNCATE trong SQL hoàn toàn giống nhau',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'DELETE có thể rollback và xóa có điều kiện, TRUNCATE không rollback và xóa toàn bộ bảng nhanh hơn',
        difficulty: 'medium',
        tags: ['sql', 'delete', 'truncate']
      },
      {
        content: 'Index luôn làm tăng hiệu suất của database',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Index tăng tốc SELECT nhưng làm chậm INSERT/UPDATE/DELETE vì phải cập nhật index',
        difficulty: 'medium',
        tags: ['database', 'index']
      },
      {
        content: 'NoSQL database không hỗ trợ ACID properties',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Nhiều NoSQL database hiện đại (như MongoDB 4.0+) đã hỗ trợ ACID transactions',
        difficulty: 'hard',
        tags: ['nosql', 'acid']
      },
      {
        content: 'View trong SQL là bảng ảo được tạo từ câu query',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'View là virtual table không lưu dữ liệu thực tế, chỉ lưu câu query định nghĩa',
        difficulty: 'easy',
        tags: ['sql', 'view']
      },
      {
        content: 'Normalization luôn tốt hơn Denormalization',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Denormalization đôi khi cần thiết để tăng hiệu suất đọc dữ liệu trong các hệ thống lớn',
        difficulty: 'hard',
        tags: ['database', 'normalization']
      },
      {
        content: 'WHERE và HAVING trong SQL có chức năng giống nhau',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'WHERE lọc trước khi GROUP BY, HAVING lọc sau khi GROUP BY và aggregate',
        difficulty: 'medium',
        tags: ['sql', 'where', 'having']
      },
      {
        content: 'MongoDB sử dụng JSON để lưu trữ dữ liệu',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'MongoDB sử dụng BSON (Binary JSON), không phải JSON thuần, để lưu trữ hiệu quả hơn',
        difficulty: 'medium',
        tags: ['mongodb', 'bson']
      },
      {
        content: 'Clustered Index quyết định thứ tự lưu trữ vật lý của dữ liệu trong bảng',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Clustered Index xác định thứ tự vật lý của dữ liệu trên đĩa, mỗi bảng chỉ có một clustered index',
        difficulty: 'hard',
        tags: ['database', 'index', 'clustered']
      }
    ]
  },

  // Phát triển ứng dụng Web
  WEB: {
    multipleChoice: [
      {
        content: 'HTML là viết tắt của gì?',
        options: [
          { text: 'Hyper Text Markup Language', isCorrect: true },
          { text: 'High Tech Modern Language', isCorrect: false },
          { text: 'Home Tool Markup Language', isCorrect: false },
          { text: 'Hyperlinks and Text Markup Language', isCorrect: false }
        ],
        explanation: 'HTML (Hyper Text Markup Language) là ngôn ngữ đánh dấu để tạo cấu trúc trang web',
        difficulty: 'easy',
        tags: ['html', 'basic']
      },
      {
        content: 'HTTP method nào được dùng để lấy dữ liệu từ server?',
        options: [
          { text: 'POST', isCorrect: false },
          { text: 'GET', isCorrect: true },
          { text: 'PUT', isCorrect: false },
          { text: 'DELETE', isCorrect: false }
        ],
        explanation: 'GET method được sử dụng để yêu cầu dữ liệu từ server mà không thay đổi state',
        difficulty: 'easy',
        tags: ['http', 'rest-api']
      },
      {
        content: 'CSS Flexbox được dùng để làm gì?',
        options: [
          { text: 'Tạo animation', isCorrect: false },
          { text: 'Bố cục linh hoạt cho elements', isCorrect: true },
          { text: 'Thêm màu sắc', isCorrect: false },
          { text: 'Tạo forms', isCorrect: false }
        ],
        explanation: 'Flexbox là module CSS giúp tạo layout linh hoạt và responsive một cách dễ dàng',
        difficulty: 'easy',
        tags: ['css', 'flexbox', 'layout']
      },
      {
        content: 'JavaScript là ngôn ngữ gì?',
        options: [
          { text: 'Compiled language', isCorrect: false },
          { text: 'Interpreted và JIT compiled', isCorrect: true },
          { text: 'Assembly language', isCorrect: false },
          { text: 'Machine language', isCorrect: false }
        ],
        explanation: 'JavaScript là interpreted language và được JIT (Just-In-Time) compiled bởi JavaScript engine',
        difficulty: 'medium',
        tags: ['javascript', 'basics']
      },
      {
        content: 'REST API sử dụng format dữ liệu nào phổ biến nhất?',
        options: [
          { text: 'XML', isCorrect: false },
          { text: 'JSON', isCorrect: true },
          { text: 'CSV', isCorrect: false },
          { text: 'Plain Text', isCorrect: false }
        ],
        explanation: 'JSON (JavaScript Object Notation) là format phổ biến nhất cho REST API vì nhẹ và dễ đọc',
        difficulty: 'easy',
        tags: ['rest-api', 'json']
      },
      {
        content: 'React Hook nào được dùng để quản lý state trong functional component?',
        options: [
          { text: 'useEffect', isCorrect: false },
          { text: 'useState', isCorrect: true },
          { text: 'useContext', isCorrect: false },
          { text: 'useReducer', isCorrect: false }
        ],
        explanation: 'useState là hook cơ bản để thêm state vào functional component trong React',
        difficulty: 'easy',
        tags: ['react', 'hooks', 'state']
      },
      {
        content: 'CORS là gì trong web development?',
        options: [
          { text: 'Cross-Origin Resource Sharing', isCorrect: true },
          { text: 'Common Object Request System', isCorrect: false },
          { text: 'Client Origin Response Security', isCorrect: false },
          { text: 'Cross-Over Resource System', isCorrect: false }
        ],
        explanation: 'CORS là cơ chế cho phép hoặc chặn requests từ origin khác với origin của trang web',
        difficulty: 'medium',
        tags: ['web', 'cors', 'security']
      },
      {
        content: 'Node.js chạy trên engine nào?',
        options: [
          { text: 'SpiderMonkey', isCorrect: false },
          { text: 'V8', isCorrect: true },
          { text: 'Chakra', isCorrect: false },
          { text: 'JavaScriptCore', isCorrect: false }
        ],
        explanation: 'Node.js được xây dựng trên V8 JavaScript engine của Google Chrome',
        difficulty: 'easy',
        tags: ['nodejs', 'backend']
      },
      {
        content: 'Express.js là gì?',
        options: [
          { text: 'Database', isCorrect: false },
          { text: 'Web framework cho Node.js', isCorrect: true },
          { text: 'Frontend library', isCorrect: false },
          { text: 'Testing tool', isCorrect: false }
        ],
        explanation: 'Express.js là web framework minimalist cho Node.js giúp xây dựng web apps và APIs',
        difficulty: 'easy',
        tags: ['express', 'nodejs', 'framework']
      },
      {
        content: 'JWT (JSON Web Token) được dùng để làm gì?',
        options: [
          { text: 'Lưu trữ dữ liệu', isCorrect: false },
          { text: 'Authentication và Authorization', isCorrect: true },
          { text: 'Styling', isCorrect: false },
          { text: 'Routing', isCorrect: false }
        ],
        explanation: 'JWT là token được mã hóa dùng để xác thực và phân quyền người dùng trong web apps',
        difficulty: 'medium',
        tags: ['jwt', 'authentication', 'security']
      },
      {
        content: 'Async/Await trong JavaScript được xây dựng trên cơ sở nào?',
        options: [
          { text: 'Callbacks', isCorrect: false },
          { text: 'Promises', isCorrect: true },
          { text: 'Generators', isCorrect: false },
          { text: 'Events', isCorrect: false }
        ],
        explanation: 'Async/Await là syntactic sugar được xây dựng trên Promises để code bất đồng bộ dễ đọc hơn',
        difficulty: 'medium',
        tags: ['javascript', 'async', 'promises']
      },
      {
        content: 'Trong React, Virtual DOM có tác dụng gì?',
        options: [
          { text: 'Lưu trữ dữ liệu', isCorrect: false },
          { text: 'Tối ưu hóa việc update UI', isCorrect: true },
          { text: 'Routing', isCorrect: false },
          { text: 'Styling components', isCorrect: false }
        ],
        explanation: 'Virtual DOM giúp React so sánh và chỉ update những phần thay đổi trên real DOM, tăng hiệu suất',
        difficulty: 'medium',
        tags: ['react', 'virtual-dom', 'performance']
      },
      {
        content: 'WebSocket khác HTTP request thông thường như thế nào?',
        options: [
          { text: 'WebSocket chậm hơn', isCorrect: false },
          { text: 'WebSocket cho phép giao tiếp 2 chiều real-time', isCorrect: true },
          { text: 'WebSocket chỉ dùng cho images', isCorrect: false },
          { text: 'Không có sự khác biệt', isCorrect: false }
        ],
        explanation: 'WebSocket tạo kết nối persistent cho phép server và client gửi messages 2 chiều real-time',
        difficulty: 'medium',
        tags: ['websocket', 'real-time', 'communication']
      },
      {
        content: 'Middleware trong Express.js là gì?',
        options: [
          { text: 'Database connection', isCorrect: false },
          { text: 'Functions xử lý request trước khi đến route handler', isCorrect: true },
          { text: 'HTML template', isCorrect: false },
          { text: 'CSS preprocessor', isCorrect: false }
        ],
        explanation: 'Middleware là functions có quyền truy cập request, response và next() để xử lý logic trước route handler',
        difficulty: 'medium',
        tags: ['express', 'middleware']
      },
      {
        content: 'SPA (Single Page Application) có đặc điểm gì?',
        options: [
          { text: 'Reload trang mỗi khi navigate', isCorrect: false },
          { text: 'Load một lần và update nội dung động', isCorrect: true },
          { text: 'Không sử dụng JavaScript', isCorrect: false },
          { text: 'Chỉ có một route duy nhất', isCorrect: false }
        ],
        explanation: 'SPA load trang một lần và dynamically update content mà không reload, mang lại trải nghiệm mượt mà',
        difficulty: 'easy',
        tags: ['spa', 'web-architecture']
      }
    ],
    trueFalse: [
      {
        content: 'HTML5 hỗ trợ audio và video natively',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'HTML5 có các thẻ <audio> và <video> hỗ trợ multimedia natively không cần plugins',
        difficulty: 'easy',
        tags: ['html5', 'multimedia']
      },
      {
        content: 'CSS Grid và Flexbox có thể được dùng cùng nhau',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Grid và Flexbox có thể kết hợp: Grid cho layout tổng thể, Flexbox cho các components nhỏ',
        difficulty: 'easy',
        tags: ['css', 'grid', 'flexbox']
      },
      {
        content: 'JavaScript là ngôn ngữ strongly typed',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'JavaScript là loosely/weakly typed - không bắt buộc khai báo kiểu dữ liệu và có thể chuyển đổi tự động',
        difficulty: 'easy',
        tags: ['javascript', 'typing']
      },
      {
        content: 'RESTful API phải sử dụng JSON',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'RESTful API có thể dùng nhiều format (JSON, XML, HTML...), JSON chỉ là phổ biến nhất',
        difficulty: 'medium',
        tags: ['rest-api', 'json']
      },
      {
        content: 'React chỉ dùng để build Single Page Applications',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'React có thể dùng cho SPAs, SSR (Next.js), mobile apps (React Native), desktop apps (Electron)',
        difficulty: 'medium',
        tags: ['react', 'spa']
      },
      {
        content: 'Cookie và LocalStorage đều có thể truy cập từ JavaScript',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Cả Cookie (trừ HttpOnly) và LocalStorage đều có thể truy cập và thao tác bằng JavaScript',
        difficulty: 'easy',
        tags: ['web', 'storage', 'cookie']
      },
      {
        content: 'HTTPS mã hóa dữ liệu giữa client và server',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'HTTPS sử dụng SSL/TLS để mã hóa dữ liệu truyền giữa browser và server, bảo vệ khỏi eavesdropping',
        difficulty: 'easy',
        tags: ['https', 'security', 'encryption']
      },
      {
        content: 'Node.js là single-threaded',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Node.js sử dụng single thread với event loop, nhưng có thể dùng worker threads cho CPU-intensive tasks',
        difficulty: 'medium',
        tags: ['nodejs', 'threading']
      },
      {
        content: 'GET request có thể có body data',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'GET request không nên có body data theo HTTP specification, data được gửi qua query parameters',
        difficulty: 'medium',
        tags: ['http', 'get', 'rest-api']
      },
      {
        content: 'useEffect hook trong React chạy sau mỗi lần render',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'useEffect chạy sau mỗi render mặc định, nhưng có thể control bằng dependency array',
        difficulty: 'medium',
        tags: ['react', 'hooks', 'useEffect']
      }
    ]
  },

  // ==================== NHÓM 2: NETWORKS & SYSTEMS ====================
  
  // Mạng máy tính
  MMT: {
    multipleChoice: [
      {
        content: 'Mô hình OSI có bao nhiêu tầng (layers)?',
        options: [
          { text: '5 tầng', isCorrect: false },
          { text: '6 tầng', isCorrect: false },
          { text: '7 tầng', isCorrect: true },
          { text: '8 tầng', isCorrect: false }
        ],
        explanation: 'Mô hình OSI có 7 tầng: Physical, Data Link, Network, Transport, Session, Presentation, Application',
        difficulty: 'easy',
        tags: ['network', 'osi-model']
      },
      {
        content: 'Giao thức nào hoạt động ở tầng Transport trong mô hình TCP/IP?',
        options: [
          { text: 'IP', isCorrect: false },
          { text: 'TCP và UDP', isCorrect: true },
          { text: 'HTTP', isCorrect: false },
          { text: 'Ethernet', isCorrect: false }
        ],
        explanation: 'TCP (Transmission Control Protocol) và UDP (User Datagram Protocol) hoạt động ở tầng Transport',
        difficulty: 'easy',
        tags: ['tcp-ip', 'transport-layer']
      },
      {
        content: 'IP Address loại IPv4 có độ dài bao nhiêu bit?',
        options: [
          { text: '16 bit', isCorrect: false },
          { text: '32 bit', isCorrect: true },
          { text: '64 bit', isCorrect: false },
          { text: '128 bit', isCorrect: false }
        ],
        explanation: 'IPv4 address có độ dài 32 bit, thường được biểu diễn dưới dạng 4 octet (vd: 192.168.1.1)',
        difficulty: 'easy',
        tags: ['network', 'ip-address', 'ipv4']
      },
      {
        content: 'DNS (Domain Name System) có chức năng gì?',
        options: [
          { text: 'Mã hóa dữ liệu', isCorrect: false },
          { text: 'Chuyển đổi domain name thành IP address', isCorrect: true },
          { text: 'Định tuyến gói tin', isCorrect: false },
          { text: 'Quản lý bandwidth', isCorrect: false }
        ],
        explanation: 'DNS chuyển đổi tên miền dễ nhớ (google.com) thành địa chỉ IP mà máy tính hiểu được',
        difficulty: 'easy',
        tags: ['network', 'dns']
      },
      {
        content: 'TCP khác UDP ở điểm nào?',
        options: [
          { text: 'TCP nhanh hơn UDP', isCorrect: false },
          { text: 'TCP đảm bảo tin cậy, UDP không', isCorrect: true },
          { text: 'UDP có header lớn hơn TCP', isCorrect: false },
          { text: 'Không có sự khác biệt', isCorrect: false }
        ],
        explanation: 'TCP là connection-oriented với error checking và retransmission. UDP là connectionless, nhanh hơn nhưng không đảm bảo',
        difficulty: 'medium',
        tags: ['tcp', 'udp', 'transport']
      },
      {
        content: 'Subnet mask 255.255.255.0 tương đương với ký hiệu CIDR nào?',
        options: [
          { text: '/16', isCorrect: false },
          { text: '/24', isCorrect: true },
          { text: '/32', isCorrect: false },
          { text: '/8', isCorrect: false }
        ],
        explanation: '255.255.255.0 có 24 bit được set thành 1, nên tương đương /24 trong CIDR notation',
        difficulty: 'medium',
        tags: ['network', 'subnet', 'cidr']
      },
      {
        content: 'HTTP sử dụng port mặc định nào?',
        options: [
          { text: 'Port 21', isCorrect: false },
          { text: 'Port 80', isCorrect: true },
          { text: 'Port 443', isCorrect: false },
          { text: 'Port 22', isCorrect: false }
        ],
        explanation: 'HTTP sử dụng port 80 mặc định, HTTPS sử dụng port 443',
        difficulty: 'easy',
        tags: ['http', 'port']
      },
      {
        content: 'Router hoạt động ở tầng nào trong mô hình OSI?',
        options: [
          { text: 'Physical Layer', isCorrect: false },
          { text: 'Data Link Layer', isCorrect: false },
          { text: 'Network Layer', isCorrect: true },
          { text: 'Transport Layer', isCorrect: false }
        ],
        explanation: 'Router hoạt động ở Network Layer (Layer 3), xử lý IP addressing và routing',
        difficulty: 'medium',
        tags: ['router', 'osi-model', 'network-layer']
      },
      {
        content: 'DHCP (Dynamic Host Configuration Protocol) làm gì?',
        options: [
          { text: 'Mã hóa dữ liệu', isCorrect: false },
          { text: 'Tự động cấp phát IP address', isCorrect: true },
          { text: 'Chuyển đổi domain sang IP', isCorrect: false },
          { text: 'Quản lý băng thông', isCorrect: false }
        ],
        explanation: 'DHCP tự động cấp phát IP address và các thông số mạng khác cho các thiết bị trong mạng',
        difficulty: 'easy',
        tags: ['dhcp', 'network']
      },
      {
        content: 'NAT (Network Address Translation) được dùng để làm gì?',
        options: [
          { text: 'Tăng tốc độ mạng', isCorrect: false },
          { text: 'Chuyển đổi giữa private IP và public IP', isCorrect: true },
          { text: 'Mã hóa dữ liệu', isCorrect: false },
          { text: 'Định tuyến gói tin', isCorrect: false }
        ],
        explanation: 'NAT cho phép nhiều thiết bị trong mạng LAN sử dụng chung một public IP để ra Internet',
        difficulty: 'medium',
        tags: ['nat', 'network']
      },
      {
        content: 'MAC Address có độ dài bao nhiêu bit?',
        options: [
          { text: '32 bit', isCorrect: false },
          { text: '48 bit', isCorrect: true },
          { text: '64 bit', isCorrect: false },
          { text: '128 bit', isCorrect: false }
        ],
        explanation: 'MAC Address (Media Access Control) có độ dài 48 bit, thường biểu diễn bằng 12 ký tự hex',
        difficulty: 'medium',
        tags: ['mac-address', 'data-link']
      },
      {
        content: 'FTP (File Transfer Protocol) sử dụng port nào?',
        options: [
          { text: 'Port 20 và 21', isCorrect: true },
          { text: 'Port 22', isCorrect: false },
          { text: 'Port 80', isCorrect: false },
          { text: 'Port 443', isCorrect: false }
        ],
        explanation: 'FTP sử dụng port 21 cho control connection và port 20 cho data transfer',
        difficulty: 'medium',
        tags: ['ftp', 'port']
      },
      {
        content: 'Firewall hoạt động ở tầng nào?',
        options: [
          { text: 'Chỉ Physical Layer', isCorrect: false },
          { text: 'Chỉ Network Layer', isCorrect: false },
          { text: 'Có thể hoạt động ở nhiều tầng', isCorrect: true },
          { text: 'Chỉ Application Layer', isCorrect: false }
        ],
        explanation: 'Firewall có thể hoạt động ở nhiều tầng khác nhau tùy loại: packet filtering (layer 3-4), application firewall (layer 7)',
        difficulty: 'hard',
        tags: ['firewall', 'security']
      },
      {
        content: 'Ping sử dụng giao thức nào?',
        options: [
          { text: 'TCP', isCorrect: false },
          { text: 'UDP', isCorrect: false },
          { text: 'ICMP', isCorrect: true },
          { text: 'HTTP', isCorrect: false }
        ],
        explanation: 'Ping sử dụng ICMP (Internet Control Message Protocol) để kiểm tra kết nối mạng',
        difficulty: 'medium',
        tags: ['ping', 'icmp', 'network']
      },
      {
        content: 'VPN (Virtual Private Network) có tác dụng gì?',
        options: [
          { text: 'Tăng tốc độ Internet', isCorrect: false },
          { text: 'Tạo kết nối an toàn qua mạng công cộng', isCorrect: true },
          { text: 'Chặn virus', isCorrect: false },
          { text: 'Cấp phát IP address', isCorrect: false }
        ],
        explanation: 'VPN tạo tunnel mã hóa qua mạng công cộng, đảm bảo kết nối an toàn và riêng tư',
        difficulty: 'easy',
        tags: ['vpn', 'security', 'network']
      }
    ],
    trueFalse: [
      {
        content: 'IPv6 address có độ dài 128 bit',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'IPv6 sử dụng 128 bit để giải quyết vấn đề cạn kiệt địa chỉ của IPv4 (32 bit)',
        difficulty: 'easy',
        tags: ['ipv6', 'ip-address']
      },
      {
        content: 'TCP là giao thức connectionless',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'TCP là connection-oriented (thiết lập kết nối 3-way handshake trước khi truyền dữ liệu). UDP mới là connectionless',
        difficulty: 'easy',
        tags: ['tcp', 'connection']
      },
      {
        content: 'Switch hoạt động ở Data Link Layer (Layer 2)',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Switch là Layer 2 device, sử dụng MAC address để forward frames',
        difficulty: 'medium',
        tags: ['switch', 'osi-model']
      },
      {
        content: 'HTTPS sử dụng SSL/TLS để mã hóa dữ liệu',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'HTTPS = HTTP + SSL/TLS, cung cấp encryption, authentication và data integrity',
        difficulty: 'easy',
        tags: ['https', 'ssl', 'security']
      },
      {
        content: 'Địa chỉ IP 192.168.x.x là public IP',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: '192.168.x.x là private IP (RFC 1918), không được route trên Internet công cộng',
        difficulty: 'easy',
        tags: ['ip-address', 'private-ip']
      },
      {
        content: 'UDP đảm bảo thứ tự gói tin khi truyền',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'UDP không đảm bảo thứ tự, không có error checking hay retransmission. TCP mới có các tính năng này',
        difficulty: 'medium',
        tags: ['udp', 'transport']
      },
      {
        content: 'ARP (Address Resolution Protocol) chuyển đổi IP address sang MAC address',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'ARP maps IP address (Layer 3) sang MAC address (Layer 2) trong mạng LAN',
        difficulty: 'medium',
        tags: ['arp', 'protocol']
      },
      {
        content: 'Hub và Switch có chức năng giống nhau',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Hub broadcast đến tất cả ports (Layer 1), Switch thông minh hơn forward đến đúng port dựa trên MAC (Layer 2)',
        difficulty: 'medium',
        tags: ['hub', 'switch', 'network-device']
      },
      {
        content: 'Bandwidth và Throughput là như nhau',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Bandwidth là capacity tối đa, Throughput là lượng dữ liệu thực tế được truyền (thường thấp hơn bandwidth)',
        difficulty: 'hard',
        tags: ['bandwidth', 'throughput', 'performance']
      },
      {
        content: 'Port 22 được sử dụng cho SSH (Secure Shell)',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'SSH sử dụng port 22 mặc định để remote access an toàn đến server',
        difficulty: 'easy',
        tags: ['ssh', 'port', 'security']
      }
    ]
  },

  // Hệ điều hành
  HDH: {
    multipleChoice: [
      {
        content: 'Hệ điều hành có chức năng chính là gì?',
        options: [
          { text: 'Viết code', isCorrect: false },
          { text: 'Quản lý tài nguyên phần cứng và phần mềm', isCorrect: true },
          { text: 'Duyệt web', isCorrect: false },
          { text: 'Chơi game', isCorrect: false }
        ],
        explanation: 'OS quản lý và điều phối tài nguyên phần cứng (CPU, RAM, I/O) và cung cấp interface cho ứng dụng',
        difficulty: 'easy',
        tags: ['os', 'basic']
      },
      {
        content: 'Process và Thread khác nhau như thế nào?',
        options: [
          { text: 'Process nhanh hơn Thread', isCorrect: false },
          { text: 'Thread là đơn vị thực thi nhỏ nhất trong Process', isCorrect: true },
          { text: 'Thread không thể chia sẻ memory', isCorrect: false },
          { text: 'Không có sự khác biệt', isCorrect: false }
        ],
        explanation: 'Process là chương trình đang chạy, Thread là lightweight process có thể chạy song song trong Process và chia sẻ memory',
        difficulty: 'medium',
        tags: ['process', 'thread', 'concurrency']
      },
      {
        content: 'Deadlock xảy ra khi nào?',
        options: [
          { text: 'CPU chạy quá nóng', isCorrect: false },
          { text: 'Các process chờ đợi lẫn nhau tạo thành vòng lặp', isCorrect: true },
          { text: 'RAM bị đầy', isCorrect: false },
          { text: 'Disk bị lỗi', isCorrect: false }
        ],
        explanation: 'Deadlock xảy ra khi các process chờ đợi resources bị hold bởi nhau tạo thành circular wait',
        difficulty: 'medium',
        tags: ['deadlock', 'concurrency']
      },
      {
        content: 'Thuật toán scheduling nào cho phép process với thời gian CPU ngắn nhất chạy trước?',
        options: [
          { text: 'FCFS (First Come First Serve)', isCorrect: false },
          { text: 'SJF (Shortest Job First)', isCorrect: true },
          { text: 'Round Robin', isCorrect: false },
          { text: 'Priority Scheduling', isCorrect: false }
        ],
        explanation: 'SJF chọn process có burst time ngắn nhất để thực thi trước, tối ưu average waiting time',
        difficulty: 'medium',
        tags: ['scheduling', 'sjf', 'cpu']
      },
      {
        content: 'Virtual Memory là gì?',
        options: [
          { text: 'RAM ảo', isCorrect: false },
          { text: 'Kỹ thuật mở rộng memory bằng disk space', isCorrect: true },
          { text: 'Cache memory', isCorrect: false },
          { text: 'ROM memory', isCorrect: false }
        ],
        explanation: 'Virtual Memory cho phép sử dụng disk space như RAM, cho phép chạy programs lớn hơn physical RAM',
        difficulty: 'easy',
        tags: ['memory', 'virtual-memory']
      },
      {
        content: 'Paging trong memory management là gì?',
        options: [
          { text: 'Đọc file từ disk', isCorrect: false },
          { text: 'Chia memory thành các fixed-size blocks', isCorrect: true },
          { text: 'Sao lưu dữ liệu', isCorrect: false },
          { text: 'Mã hóa memory', isCorrect: false }
        ],
        explanation: 'Paging chia physical memory thành frames và logical memory thành pages có cùng kích thước',
        difficulty: 'medium',
        tags: ['memory', 'paging']
      },
      {
        content: 'Semaphore được dùng để làm gì?',
        options: [
          { text: 'Tăng tốc CPU', isCorrect: false },
          { text: 'Đồng bộ hóa processes/threads', isCorrect: true },
          { text: 'Quản lý disk', isCorrect: false },
          { text: 'Backup dữ liệu', isCorrect: false }
        ],
        explanation: 'Semaphore là synchronization tool để control access vào shared resources và tránh race conditions',
        difficulty: 'medium',
        tags: ['semaphore', 'synchronization', 'concurrency']
      },
      {
        content: 'Cache memory nằm ở đâu trong memory hierarchy?',
        options: [
          { text: 'Giữa CPU registers và RAM', isCorrect: true },
          { text: 'Sau hard disk', isCorrect: false },
          { text: 'Trước CPU registers', isCorrect: false },
          { text: 'Sau RAM', isCorrect: false }
        ],
        explanation: 'Cache nằm giữa CPU và RAM, nhanh hơn RAM nhưng chậm hơn registers, lưu frequently accessed data',
        difficulty: 'medium',
        tags: ['memory', 'cache', 'hierarchy']
      },
      {
        content: 'File System có chức năng gì?',
        options: [
          { text: 'Mã hóa dữ liệu', isCorrect: false },
          { text: 'Tổ chức và quản lý cách lưu trữ files trên disk', isCorrect: true },
          { text: 'Tăng tốc CPU', isCorrect: false },
          { text: 'Quản lý network', isCorrect: false }
        ],
        explanation: 'File System quản lý cách data được lưu trữ và truy xuất trên storage devices (HDD, SSD)',
        difficulty: 'easy',
        tags: ['file-system', 'storage']
      },
      {
        content: 'Context Switch là gì?',
        options: [
          { text: 'Chuyển đổi giữa user mode và kernel mode', isCorrect: false },
          { text: 'Lưu và restore state khi chuyển đổi giữa processes', isCorrect: true },
          { text: 'Thay đổi priority của process', isCorrect: false },
          { text: 'Tắt process', isCorrect: false }
        ],
        explanation: 'Context Switch là quá trình save state của process hiện tại và load state của process mới để CPU switch giữa các processes',
        difficulty: 'medium',
        tags: ['context-switch', 'process', 'cpu']
      },
      {
        content: 'Interrupt là gì trong OS?',
        options: [
          { text: 'Lỗi chương trình', isCorrect: false },
          { text: 'Signal thông báo CPU có sự kiện cần xử lý', isCorrect: true },
          { text: 'Tắt máy tính', isCorrect: false },
          { text: 'Backup dữ liệu', isCorrect: false }
        ],
        explanation: 'Interrupt là signal từ hardware hoặc software thông báo CPU ngừng việc hiện tại để xử lý event quan trọng',
        difficulty: 'medium',
        tags: ['interrupt', 'cpu']
      },
      {
        content: 'Thrashing xảy ra khi nào?',
        options: [
          { text: 'CPU chạy quá nóng', isCorrect: false },
          { text: 'System dành quá nhiều thời gian cho page swapping', isCorrect: true },
          { text: 'Disk đầy', isCorrect: false },
          { text: 'RAM lỗi', isCorrect: false }
        ],
        explanation: 'Thrashing xảy ra khi OS liên tục swap pages giữa RAM và disk, làm giảm hiệu suất nghiêm trọng',
        difficulty: 'hard',
        tags: ['thrashing', 'memory', 'performance']
      },
      {
        content: 'Kernel là gì?',
        options: [
          { text: 'Ứng dụng desktop', isCorrect: false },
          { text: 'Core của OS, quản lý tài nguyên hệ thống', isCorrect: true },
          { text: 'Web browser', isCorrect: false },
          { text: 'Database', isCorrect: false }
        ],
        explanation: 'Kernel là core component của OS, interface giữa applications và hardware, quản lý CPU, memory, devices',
        difficulty: 'easy',
        tags: ['kernel', 'os']
      },
      {
        content: 'Round Robin scheduling sử dụng khái niệm gì?',
        options: [
          { text: 'Priority queue', isCorrect: false },
          { text: 'Time quantum (time slice)', isCorrect: true },
          { text: 'Stack', isCorrect: false },
          { text: 'Hash table', isCorrect: false }
        ],
        explanation: 'Round Robin cấp cho mỗi process một time quantum để thực thi, sau đó chuyển sang process tiếp theo',
        difficulty: 'medium',
        tags: ['scheduling', 'round-robin']
      },
      {
        content: 'Mutex khác Semaphore như thế nào?',
        options: [
          { text: 'Mutex nhanh hơn', isCorrect: false },
          { text: 'Mutex là binary lock, Semaphore có thể có nhiều giá trị', isCorrect: true },
          { text: 'Không có sự khác biệt', isCorrect: false },
          { text: 'Mutex chỉ dùng cho threads', isCorrect: false }
        ],
        explanation: 'Mutex là binary semaphore (0 hoặc 1) cho mutual exclusion. Semaphore có thể count > 1 cho multiple resources',
        difficulty: 'hard',
        tags: ['mutex', 'semaphore', 'synchronization']
      }
    ],
    trueFalse: [
      {
        content: 'Linux là open-source operating system',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Linux là open-source OS dựa trên Unix, source code được công khai và free',
        difficulty: 'easy',
        tags: ['linux', 'open-source']
      },
      {
        content: 'Multi-threading luôn nhanh hơn single-threading',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Multi-threading có overhead (context switching, synchronization). Với tasks đơn giản, single-thread có thể nhanh hơn',
        difficulty: 'medium',
        tags: ['threading', 'performance']
      },
      {
        content: 'Tất cả 4 điều kiện của Deadlock phải xảy ra đồng thời',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: '4 điều kiện: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait - tất cả phải có mới deadlock',
        difficulty: 'medium',
        tags: ['deadlock', 'conditions']
      },
      {
        content: 'Virtual Memory luôn nhanh hơn Physical Memory',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Virtual memory dùng disk (chậm hơn RAM nhiều). Nó chỉ mở rộng capacity chứ không tăng speed',
        difficulty: 'easy',
        tags: ['memory', 'virtual-memory']
      },
      {
        content: 'Kernel mode có nhiều quyền hơn User mode',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Kernel mode có full access vào hardware và memory. User mode bị hạn chế để bảo vệ hệ thống',
        difficulty: 'easy',
        tags: ['kernel', 'user-mode']
      },
      {
        content: 'Race condition chỉ xảy ra trong multi-threaded programs',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Race condition có thể xảy ra trong bất kỳ concurrent execution nào (multi-process, multi-thread, distributed systems)',
        difficulty: 'medium',
        tags: ['race-condition', 'concurrency']
      },
      {
        content: 'FCFS scheduling có thể gây ra Convoy Effect',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Convoy Effect xảy ra khi processes ngắn phải chờ process dài chạy trước trong FCFS',
        difficulty: 'hard',
        tags: ['scheduling', 'fcfs', 'convoy-effect']
      },
      {
        content: 'Swapping và Paging là cùng một khái niệm',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Swapping move toàn bộ process giữa RAM và disk. Paging chỉ move pages (phần nhỏ của process)',
        difficulty: 'medium',
        tags: ['swapping', 'paging', 'memory']
      },
      {
        content: 'Preemptive scheduling cho phép OS tạm dừng process đang chạy',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Preemptive scheduling cho phép OS interrupt process để schedule process khác (như Round Robin)',
        difficulty: 'medium',
        tags: ['scheduling', 'preemptive']
      },
      {
        content: 'SSD có seek time nhanh hơn HDD',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'SSD không có moving parts nên seek time gần như bằng 0, nhanh hơn HDD nhiều lần',
        difficulty: 'easy',
        tags: ['storage', 'ssd', 'hdd']
      }
    ]
  },

  // Kiến trúc máy tính
  KTMT: {
    multipleChoice: [
      {
        content: 'CPU là viết tắt của gì?',
        options: [
          { text: 'Computer Processing Unit', isCorrect: false },
          { text: 'Central Processing Unit', isCorrect: true },
          { text: 'Central Program Unit', isCorrect: false },
          { text: 'Computer Program Unit', isCorrect: false }
        ],
        explanation: 'CPU (Central Processing Unit) là bộ xử lý trung tâm, "bộ não" của máy tính',
        difficulty: 'easy',
        tags: ['cpu', 'basic']
      },
      {
        content: 'Von Neumann architecture có đặc điểm gì?',
        options: [
          { text: 'Instructions và data được lưu riêng biệt', isCorrect: false },
          { text: 'Instructions và data cùng lưu trong memory', isCorrect: true },
          { text: 'Không có memory', isCorrect: false },
          { text: 'Chỉ có ALU', isCorrect: false }
        ],
        explanation: 'Von Neumann architecture lưu cả instructions và data trong cùng memory (stored-program concept)',
        difficulty: 'medium',
        tags: ['architecture', 'von-neumann']
      },
      {
        content: 'ALU trong CPU có chức năng gì?',
        options: [
          { text: 'Lưu trữ dữ liệu', isCorrect: false },
          { text: 'Thực hiện các phép toán số học và logic', isCorrect: true },
          { text: 'Quản lý input/output', isCorrect: false },
          { text: 'Điều khiển luồng chương trình', isCorrect: false }
        ],
        explanation: 'ALU (Arithmetic Logic Unit) thực hiện các phép toán cộng trừ nhân chia và các phép logic AND OR NOT',
        difficulty: 'easy',
        tags: ['cpu', 'alu']
      },
      {
        content: 'Cache memory có đặc điểm gì?',
        options: [
          { text: 'Chậm hơn RAM', isCorrect: false },
          { text: 'Nhanh hơn RAM nhưng dung lượng nhỏ hơn', isCorrect: true },
          { text: 'Rẻ hơn RAM', isCorrect: false },
          { text: 'Lớn hơn RAM', isCorrect: false }
        ],
        explanation: 'Cache là SRAM nhanh hơn RAM (DRAM) nhưng đắt hơn và có dung lượng nhỏ, lưu frequently accessed data',
        difficulty: 'easy',
        tags: ['cache', 'memory']
      },
      {
        content: 'Pipelining trong CPU là gì?',
        options: [
          { text: 'Chạy nhiều programs cùng lúc', isCorrect: false },
          { text: 'Chia instruction execution thành stages và overlap', isCorrect: true },
          { text: 'Tăng clock speed', isCorrect: false },
          { text: 'Thêm cores vào CPU', isCorrect: false }
        ],
        explanation: 'Pipelining chia execution thành stages (fetch, decode, execute...) cho phép process nhiều instructions đồng thời',
        difficulty: 'medium',
        tags: ['cpu', 'pipelining', 'performance']
      },
      {
        content: 'RISC và CISC khác nhau như thế nào?',
        options: [
          { text: 'RISC có nhiều instructions phức tạp hơn', isCorrect: false },
          { text: 'RISC có ít instructions đơn giản, CISC có nhiều instructions phức tạp', isCorrect: true },
          { text: 'Không có sự khác biệt', isCorrect: false },
          { text: 'CISC nhanh hơn RISC', isCorrect: false }
        ],
        explanation: 'RISC (Reduced Instruction Set Computer) có ít instructions đơn giản. CISC (Complex) có nhiều instructions phức tạp',
        difficulty: 'medium',
        tags: ['architecture', 'risc', 'cisc']
      },
      {
        content: 'Register trong CPU có tốc độ như thế nào?',
        options: [
          { text: 'Chậm nhất', isCorrect: false },
          { text: 'Nhanh nhất trong memory hierarchy', isCorrect: true },
          { text: 'Ngang RAM', isCorrect: false },
          { text: 'Ngang Cache', isCorrect: false }
        ],
        explanation: 'Registers là fastest memory trong CPU, truy cập trong 1 clock cycle',
        difficulty: 'easy',
        tags: ['register', 'memory', 'speed']
      },
      {
        content: 'Bus trong computer architecture là gì?',
        options: [
          { text: 'Phương tiện giao thông', isCorrect: false },
          { text: 'Communication pathway giữa components', isCorrect: true },
          { text: 'Một loại memory', isCorrect: false },
          { text: 'Một loại storage', isCorrect: false }
        ],
        explanation: 'Bus là tập hợp các dây dẫn để truyền data, address và control signals giữa CPU, memory và I/O devices',
        difficulty: 'easy',
        tags: ['bus', 'architecture']
      },
      {
        content: 'Instruction cycle bao gồm những giai đoạn nào?',
        options: [
          { text: 'Chỉ có Execute', isCorrect: false },
          { text: 'Fetch, Decode, Execute', isCorrect: true },
          { text: 'Chỉ có Fetch và Execute', isCorrect: false },
          { text: 'Store và Load', isCorrect: false }
        ],
        explanation: 'Instruction cycle: Fetch (lấy instruction từ memory), Decode (giải mã), Execute (thực thi)',
        difficulty: 'easy',
        tags: ['cpu', 'instruction-cycle']
      },
      {
        content: 'Multi-core processor có lợi ích gì?',
        options: [
          { text: 'Tăng clock speed', isCorrect: false },
          { text: 'Cho phép parallel processing', isCorrect: true },
          { text: 'Giảm giá thành', isCorrect: false },
          { text: 'Tăng dung lượng RAM', isCorrect: false }
        ],
        explanation: 'Multi-core có nhiều processing units độc lập, cho phép chạy nhiều tasks song song, tăng throughput',
        difficulty: 'easy',
        tags: ['cpu', 'multi-core', 'parallel']
      },
      {
        content: 'DMA (Direct Memory Access) có tác dụng gì?',
        options: [
          { text: 'Tăng tốc CPU', isCorrect: false },
          { text: 'Cho phép I/O devices truy cập memory trực tiếp không qua CPU', isCorrect: true },
          { text: 'Mã hóa memory', isCorrect: false },
          { text: 'Backup memory', isCorrect: false }
        ],
        explanation: 'DMA giải phóng CPU bằng cách cho I/O devices truyền data trực tiếp đến/từ memory',
        difficulty: 'medium',
        tags: ['dma', 'io', 'memory']
      },
      {
        content: 'Clock speed của CPU được đo bằng đơn vị gì?',
        options: [
          { text: 'Bytes', isCorrect: false },
          { text: 'Hertz (Hz)', isCorrect: true },
          { text: 'Bits', isCorrect: false },
          { text: 'Watts', isCorrect: false }
        ],
        explanation: 'Clock speed đo bằng Hertz (cycles per second), thường là GHz (billions of cycles/second)',
        difficulty: 'easy',
        tags: ['cpu', 'clock-speed']
      },
      {
        content: 'Harvard architecture khác Von Neumann như thế nào?',
        options: [
          { text: 'Không có sự khác biệt', isCorrect: false },
          { text: 'Harvard có separate memory cho instructions và data', isCorrect: true },
          { text: 'Harvard chậm hơn', isCorrect: false },
          { text: 'Harvard không có cache', isCorrect: false }
        ],
        explanation: 'Harvard architecture có riêng instruction memory và data memory, cho phép simultaneous access',
        difficulty: 'hard',
        tags: ['architecture', 'harvard', 'von-neumann']
      },
      {
        content: 'Interrupt controller có chức năng gì?',
        options: [
          { text: 'Tắt máy tính', isCorrect: false },
          { text: 'Quản lý và ưu tiên các interrupt signals', isCorrect: true },
          { text: 'Tăng tốc CPU', isCorrect: false },
          { text: 'Lưu trữ dữ liệu', isCorrect: false }
        ],
        explanation: 'Interrupt controller nhận interrupt requests từ devices, assign priorities và notify CPU',
        difficulty: 'medium',
        tags: ['interrupt', 'controller', 'io']
      },
      {
        content: 'BIOS (Basic Input/Output System) nằm ở đâu?',
        options: [
          { text: 'RAM', isCorrect: false },
          { text: 'ROM/Flash memory trên motherboard', isCorrect: true },
          { text: 'Hard disk', isCorrect: false },
          { text: 'CPU', isCorrect: false }
        ],
        explanation: 'BIOS được lưu trong ROM/Flash trên motherboard, khởi động hardware khi boot và load OS',
        difficulty: 'medium',
        tags: ['bios', 'boot', 'firmware']
      }
    ],
    trueFalse: [
      {
        content: 'CPU càng nhiều cores thì càng nhanh với mọi loại tasks',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Multi-core chỉ nhanh hơn với parallel workloads. Single-threaded tasks không được lợi từ nhiều cores',
        difficulty: 'medium',
        tags: ['cpu', 'multi-core', 'performance']
      },
      {
        content: 'Cache miss làm giảm hiệu suất của CPU',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Cache miss buộc CPU phải fetch data từ RAM (chậm hơn), làm giảm performance',
        difficulty: 'easy',
        tags: ['cache', 'performance']
      },
      {
        content: 'RAM là non-volatile memory',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'RAM là volatile - mất dữ liệu khi tắt nguồn. ROM/SSD/HDD mới là non-volatile',
        difficulty: 'easy',
        tags: ['ram', 'memory', 'volatile']
      },
      {
        content: 'Assembly language là machine language',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Assembly là low-level language sử dụng mnemonics. Machine language là binary code (0s và 1s)',
        difficulty: 'medium',
        tags: ['assembly', 'machine-language']
      },
      {
        content: 'Pipelining luôn tăng gấp đôi hiệu suất CPU',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Pipelining có hazards (data, control, structural) làm giảm speedup, không đạt được ideal speedup',
        difficulty: 'hard',
        tags: ['pipelining', 'performance', 'hazards']
      },
      {
        content: 'Little-endian và Big-endian là cách lưu trữ bytes khác nhau',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Little-endian lưu least significant byte trước, Big-endian lưu most significant byte trước',
        difficulty: 'medium',
        tags: ['endianness', 'byte-order']
      },
      {
        content: 'SRAM nhanh hơn DRAM',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'SRAM (cache) nhanh hơn DRAM (RAM) nhưng đắt hơn và dung lượng nhỏ hơn',
        difficulty: 'easy',
        tags: ['sram', 'dram', 'memory']
      },
      {
        content: 'Superscalar processor có thể execute nhiều instructions per clock cycle',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Superscalar có multiple execution units để dispatch và execute nhiều instructions song song',
        difficulty: 'hard',
        tags: ['superscalar', 'cpu', 'parallelism']
      },
      {
        content: 'Virtual memory và Cache là cùng một concept',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Virtual memory mở rộng RAM bằng disk. Cache là fast memory giữa CPU và RAM. Khác nhau hoàn toàn',
        difficulty: 'medium',
        tags: ['virtual-memory', 'cache']
      },
      {
        content: 'Interrupt có priority cao hơn sẽ được xử lý trước',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Interrupt controller sử dụng priority scheme, interrupts quan trọng hơn được xử lý trước',
        difficulty: 'easy',
        tags: ['interrupt', 'priority']
      }
    ]
  },

  // ==================== NHÓM 3: MODERN CS ====================
  
  // Trí tuệ nhân tạo
  AI: {
    multipleChoice: [
      {
        content: 'Machine Learning là gì?',
        options: [
          { text: 'Máy móc học cách tự sửa chữa', isCorrect: false },
          { text: 'Hệ thống học từ dữ liệu mà không được lập trình tường minh', isCorrect: true },
          { text: 'Robot tự động', isCorrect: false },
          { text: 'Phần mềm antivirus', isCorrect: false }
        ],
        explanation: 'Machine Learning cho phép systems học và cải thiện từ experience (data) mà không cần explicit programming',
        difficulty: 'easy',
        tags: ['ml', 'ai', 'basic']
      },
      {
        content: 'Supervised Learning khác Unsupervised Learning như thế nào?',
        options: [
          { text: 'Supervised nhanh hơn', isCorrect: false },
          { text: 'Supervised có labeled data, Unsupervised không', isCorrect: true },
          { text: 'Supervised không cần data', isCorrect: false },
          { text: 'Không có sự khác biệt', isCorrect: false }
        ],
        explanation: 'Supervised learning train với labeled data (input-output pairs). Unsupervised tìm patterns trong unlabeled data',
        difficulty: 'easy',
        tags: ['ml', 'supervised', 'unsupervised']
      },
      {
        content: 'Neural Network được lấy cảm hứng từ đâu?',
        options: [
          { text: 'Computer chips', isCorrect: false },
          { text: 'Não người và neurons', isCorrect: true },
          { text: 'Internet', isCorrect: false },
          { text: 'Database', isCorrect: false }
        ],
        explanation: 'Neural Networks mô phỏng cách neurons trong não kết nối và xử lý thông tin',
        difficulty: 'easy',
        tags: ['neural-network', 'deep-learning']
      },
      {
        content: 'Overfitting trong Machine Learning là gì?',
        options: [
          { text: 'Model quá đơn giản', isCorrect: false },
          { text: 'Model học quá tốt training data nhưng kém với new data', isCorrect: true },
          { text: 'Có quá nhiều data', isCorrect: false },
          { text: 'Training quá nhanh', isCorrect: false }
        ],
        explanation: 'Overfitting xảy ra khi model memorize training data thay vì generalize, dẫn đến poor performance trên test data',
        difficulty: 'medium',
        tags: ['ml', 'overfitting', 'generalization']
      },
      {
        content: 'Deep Learning khác Machine Learning truyền thống ở điểm nào?',
        options: [
          { text: 'Deep Learning chậm hơn', isCorrect: false },
          { text: 'Deep Learning sử dụng nhiều layers trong neural networks', isCorrect: true },
          { text: 'Deep Learning không cần data', isCorrect: false },
          { text: 'Không có sự khác biệt', isCorrect: false }
        ],
        explanation: 'Deep Learning là subset của ML sử dụng neural networks với nhiều hidden layers để học representations phức tạp',
        difficulty: 'medium',
        tags: ['deep-learning', 'neural-network']
      },
      {
        content: 'Activation function trong Neural Network có tác dụng gì?',
        options: [
          { text: 'Lưu trữ weights', isCorrect: false },
          { text: 'Thêm non-linearity vào network', isCorrect: true },
          { text: 'Giảm learning rate', isCorrect: false },
          { text: 'Tăng tốc training', isCorrect: false }
        ],
        explanation: 'Activation functions (ReLU, Sigmoid, Tanh) thêm non-linearity, cho phép network học complex patterns',
        difficulty: 'medium',
        tags: ['neural-network', 'activation']
      },
      {
        content: 'CNN (Convolutional Neural Network) thường được dùng cho task nào?',
        options: [
          { text: 'Text classification', isCorrect: false },
          { text: 'Image recognition', isCorrect: true },
          { text: 'Time series prediction', isCorrect: false },
          { text: 'Audio generation', isCorrect: false }
        ],
        explanation: 'CNN rất hiệu quả cho image tasks nhờ convolutional layers detect spatial features',
        difficulty: 'easy',
        tags: ['cnn', 'computer-vision', 'deep-learning']
      },
      {
        content: 'RNN (Recurrent Neural Network) thích hợp cho loại dữ liệu nào?',
        options: [
          { text: 'Images', isCorrect: false },
          { text: 'Sequential data (text, time series)', isCorrect: true },
          { text: 'Tabular data', isCorrect: false },
          { text: 'Static data', isCorrect: false }
        ],
        explanation: 'RNN có memory của previous inputs, phù hợp cho sequential data như text, speech, time series',
        difficulty: 'medium',
        tags: ['rnn', 'sequence', 'nlp']
      },
      {
        content: 'Gradient Descent là gì trong Machine Learning?',
        options: [
          { text: 'Phương pháp load data', isCorrect: false },
          { text: 'Algorithm để tối ưu hóa model bằng cách minimize loss', isCorrect: true },
          { text: 'Cách tạo features', isCorrect: false },
          { text: 'Phương pháp test model', isCorrect: false }
        ],
        explanation: 'Gradient Descent iteratively điều chỉnh weights theo hướng giảm loss function để tìm optimal parameters',
        difficulty: 'medium',
        tags: ['ml', 'optimization', 'gradient-descent']
      },
      {
        content: 'Transfer Learning là gì?',
        options: [
          { text: 'Chuyển data giữa các servers', isCorrect: false },
          { text: 'Sử dụng pre-trained model cho task mới', isCorrect: true },
          { text: 'Học nhiều tasks cùng lúc', isCorrect: false },
          { text: 'Backup model', isCorrect: false }
        ],
        explanation: 'Transfer Learning tận dụng knowledge từ pre-trained model (trained trên large dataset) cho similar task mới',
        difficulty: 'medium',
        tags: ['transfer-learning', 'deep-learning']
      },
      {
        content: 'NLP (Natural Language Processing) là gì?',
        options: [
          { text: 'Network Load Balancing', isCorrect: false },
          { text: 'Xử lý và hiểu ngôn ngữ tự nhiên của con người', isCorrect: true },
          { text: 'Neural Learning Protocol', isCorrect: false },
          { text: 'Network Layer Protocol', isCorrect: false }
        ],
        explanation: 'NLP là AI field tập trung vào interaction giữa computers và human language (text, speech)',
        difficulty: 'easy',
        tags: ['nlp', 'ai', 'language']
      },
      {
        content: 'Reinforcement Learning hoạt động như thế nào?',
        options: [
          { text: 'Học từ labeled data', isCorrect: false },
          { text: 'Agent học bằng cách interact với environment và nhận rewards', isCorrect: true },
          { text: 'Clustering dữ liệu', isCorrect: false },
          { text: 'Giảm dimensionality', isCorrect: false }
        ],
        explanation: 'Reinforcement Learning: agent thử actions, nhận rewards/penalties, học policy để maximize cumulative reward',
        difficulty: 'hard',
        tags: ['reinforcement-learning', 'ai']
      },
      {
        content: 'Backpropagation trong Neural Network làm gì?',
        options: [
          { text: 'Forward pass through network', isCorrect: false },
          { text: 'Tính gradients và update weights từ output về input', isCorrect: true },
          { text: 'Initialize weights', isCorrect: false },
          { text: 'Normalize data', isCorrect: false }
        ],
        explanation: 'Backpropagation tính gradient của loss theo từng weight, propagate error từ output layer về input để update weights',
        difficulty: 'hard',
        tags: ['neural-network', 'backpropagation', 'training']
      },
      {
        content: 'Computer Vision là gì?',
        options: [
          { text: 'Màn hình máy tính', isCorrect: false },
          { text: 'AI field giúp computers hiểu và interpret images/videos', isCorrect: true },
          { text: 'Camera software', isCorrect: false },
          { text: 'Graphics design', isCorrect: false }
        ],
        explanation: 'Computer Vision cho phép machines analyze và understand visual world (object detection, segmentation, recognition)',
        difficulty: 'easy',
        tags: ['computer-vision', 'ai', 'image']
      },
      {
        content: 'Batch size trong training Neural Network ảnh hưởng gì?',
        options: [
          { text: 'Số lượng layers', isCorrect: false },
          { text: 'Số samples xử lý trước khi update weights', isCorrect: true },
          { text: 'Learning rate', isCorrect: false },
          { text: 'Số epochs', isCorrect: false }
        ],
        explanation: 'Batch size là số training examples được process cùng lúc trước mỗi lần gradient descent update',
        difficulty: 'medium',
        tags: ['training', 'neural-network', 'batch']
      }
    ],
    trueFalse: [
      {
        content: 'AI và Machine Learning là cùng một khái niệm',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'AI là field rộng hơn. Machine Learning là subset của AI. Deep Learning là subset của ML',
        difficulty: 'easy',
        tags: ['ai', 'ml', 'concepts']
      },
      {
        content: 'Deep Learning luôn tốt hơn Machine Learning truyền thống',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Deep Learning cần nhiều data và compute. Với small datasets, traditional ML (Random Forest, SVM) có thể tốt hơn',
        difficulty: 'medium',
        tags: ['deep-learning', 'ml']
      },
      {
        content: 'Training set và Test set phải tách riêng biệt',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Test set phải hoàn toàn tách biệt để đánh giá model objectively. Dùng training data để test gây overfitting illusion',
        difficulty: 'easy',
        tags: ['ml', 'training', 'testing']
      },
      {
        content: 'CNN chỉ có thể dùng cho images',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'CNN cũng hiệu quả cho audio, text, time series - bất kỳ data nào có spatial/temporal structure',
        difficulty: 'medium',
        tags: ['cnn', 'deep-learning']
      },
      {
        content: 'Dropout là kỹ thuật regularization để tránh overfitting',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Dropout randomly tắt neurons trong training để network không rely quá nhiều vào specific neurons, giảm overfitting',
        difficulty: 'medium',
        tags: ['regularization', 'dropout', 'overfitting']
      },
      {
        content: 'Learning rate càng cao thì model học càng nhanh và tốt',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Learning rate quá cao khiến training diverge, không converge. Cần balance giữa speed và stability',
        difficulty: 'medium',
        tags: ['training', 'learning-rate', 'optimization']
      },
      {
        content: 'Feature engineering quan trọng trong Deep Learning',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Deep Learning tự học features từ raw data. Traditional ML mới cần manual feature engineering',
        difficulty: 'hard',
        tags: ['deep-learning', 'features']
      },
      {
        content: 'GPT (Generative Pre-trained Transformer) là một loại NLP model',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'GPT là large language model dùng transformer architecture, pre-trained trên massive text data',
        difficulty: 'easy',
        tags: ['nlp', 'gpt', 'transformer']
      },
      {
        content: 'Bias trong Machine Learning luôn là điều xấu',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Bias term trong model là cần thiết. "Bias" như prejudice trong data là xấu. Bias-variance tradeoff cần balance',
        difficulty: 'hard',
        tags: ['ml', 'bias', 'concepts']
      },
      {
        content: 'Data augmentation giúp tăng kích thước training set một cách hiệu quả',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Data augmentation tạo variations (rotate, flip, crop...) từ existing data, giúp model generalize tốt hơn',
        difficulty: 'easy',
        tags: ['data-augmentation', 'training']
      }
    ]
  },

  // An toàn thông tin
  ATTT: {
    multipleChoice: [
      {
        content: 'CIA triad trong security đại diện cho gì?',
        options: [
          { text: 'Computer Internet Access', isCorrect: false },
          { text: 'Confidentiality, Integrity, Availability', isCorrect: true },
          { text: 'Central Intelligence Agency', isCorrect: false },
          { text: 'Cryptography Implementation Algorithm', isCorrect: false }
        ],
        explanation: 'CIA triad là 3 pillars của information security: Confidentiality (bảo mật), Integrity (toàn vẹn), Availability (khả dụng)',
        difficulty: 'easy',
        tags: ['security', 'cia-triad', 'basic']
      },
      {
        content: 'Encryption là gì?',
        options: [
          { text: 'Xóa dữ liệu', isCorrect: false },
          { text: 'Chuyển đổi dữ liệu thành dạng không đọc được', isCorrect: true },
          { text: 'Backup dữ liệu', isCorrect: false },
          { text: 'Nén dữ liệu', isCorrect: false }
        ],
        explanation: 'Encryption chuyển plaintext thành ciphertext bằng algorithm và key để bảo vệ confidentiality',
        difficulty: 'easy',
        tags: ['encryption', 'cryptography']
      },
      {
        content: 'Symmetric encryption khác Asymmetric encryption như thế nào?',
        options: [
          { text: 'Symmetric nhanh hơn', isCorrect: false },
          { text: 'Symmetric dùng 1 key, Asymmetric dùng 2 keys (public & private)', isCorrect: true },
          { text: 'Symmetric an toàn hơn', isCorrect: false },
          { text: 'Không có sự khác biệt', isCorrect: false }
        ],
        explanation: 'Symmetric dùng same key cho encrypt/decrypt (AES). Asymmetric dùng key pair: public key encrypt, private key decrypt (RSA)',
        difficulty: 'medium',
        tags: ['encryption', 'symmetric', 'asymmetric']
      },
      {
        content: 'SQL Injection là loại tấn công gì?',
        options: [
          { text: 'Physical attack', isCorrect: false },
          { text: 'Web vulnerability cho phép attacker thực thi SQL commands', isCorrect: true },
          { text: 'Virus', isCorrect: false },
          { text: 'DDoS attack', isCorrect: false }
        ],
        explanation: 'SQL Injection inject malicious SQL code vào input để manipulate database queries và access/modify data',
        difficulty: 'easy',
        tags: ['web-security', 'sql-injection', 'vulnerability']
      },
      {
        content: 'XSS (Cross-Site Scripting) là gì?',
        options: [
          { text: 'Network protocol', isCorrect: false },
          { text: 'Inject malicious scripts vào trusted websites', isCorrect: true },
          { text: 'Database attack', isCorrect: false },
          { text: 'Password cracking', isCorrect: false }
        ],
        explanation: 'XSS inject malicious JavaScript vào web pages, có thể steal cookies, session tokens, hoặc redirect users',
        difficulty: 'medium',
        tags: ['web-security', 'xss', 'vulnerability']
      },
      {
        content: 'Firewall có chức năng chính là gì?',
        options: [
          { text: 'Tăng tốc độ mạng', isCorrect: false },
          { text: 'Kiểm soát và filter network traffic', isCorrect: true },
          { text: 'Backup dữ liệu', isCorrect: false },
          { text: 'Mã hóa emails', isCorrect: false }
        ],
        explanation: 'Firewall monitor và control incoming/outgoing network traffic dựa trên security rules để block unauthorized access',
        difficulty: 'easy',
        tags: ['firewall', 'network-security']
      },
      {
        content: 'Hashing khác Encryption ở điểm nào?',
        options: [
          { text: 'Hashing chậm hơn', isCorrect: false },
          { text: 'Hashing là one-way, không thể reverse', isCorrect: true },
          { text: 'Hashing an toàn hơn', isCorrect: false },
          { text: 'Không có sự khác biệt', isCorrect: false }
        ],
        explanation: 'Hashing là one-way function (MD5, SHA-256) không thể decrypt. Encryption là two-way, có thể decrypt với key',
        difficulty: 'medium',
        tags: ['hashing', 'encryption', 'cryptography']
      },
      {
        content: 'SSL/TLS được dùng để làm gì?',
        options: [
          { text: 'Tăng tốc website', isCorrect: false },
          { text: 'Mã hóa communication giữa client và server', isCorrect: true },
          { text: 'Lưu trữ passwords', isCorrect: false },
          { text: 'Scan virus', isCorrect: false }
        ],
        explanation: 'SSL/TLS protocols provide encryption, authentication và integrity cho HTTPS connections',
        difficulty: 'easy',
        tags: ['ssl', 'tls', 'encryption', 'https']
      },
      {
        content: 'Phishing là gì?',
        options: [
          { text: 'Malware', isCorrect: false },
          { text: 'Social engineering attack giả mạo để lấy thông tin nhạy cảm', isCorrect: true },
          { text: 'Brute force attack', isCorrect: false },
          { text: 'DDoS attack', isCorrect: false }
        ],
        explanation: 'Phishing giả mạo trusted entities (email, website) để lừa victims cung cấp passwords, credit cards, etc.',
        difficulty: 'easy',
        tags: ['phishing', 'social-engineering', 'attack']
      },
      {
        content: 'Two-Factor Authentication (2FA) tăng security như thế nào?',
        options: [
          { text: 'Mã hóa data', isCorrect: false },
          { text: 'Yêu cầu 2 methods khác nhau để verify identity', isCorrect: true },
          { text: 'Backup passwords', isCorrect: false },
          { text: 'Scan virus', isCorrect: false }
        ],
        explanation: '2FA kết hợp 2 factors (vd: password + SMS code) làm attacker khó compromise account hơn',
        difficulty: 'easy',
        tags: ['2fa', 'authentication', 'security']
      },
      {
        content: 'DDoS (Distributed Denial of Service) attack hoạt động như thế nào?',
        options: [
          { text: 'Steal data', isCorrect: false },
          { text: 'Overwhelm target với massive traffic từ nhiều sources', isCorrect: true },
          { text: 'Crack passwords', isCorrect: false },
          { text: 'Install malware', isCorrect: false }
        ],
        explanation: 'DDoS dùng botnet gửi massive requests để exhaust target resources, làm service unavailable',
        difficulty: 'medium',
        tags: ['ddos', 'attack', 'availability']
      },
      {
        content: 'Penetration Testing là gì?',
        options: [
          { text: 'Install antivirus', isCorrect: false },
          { text: 'Ethical hacking để tìm vulnerabilities', isCorrect: true },
          { text: 'Backup testing', isCorrect: false },
          { text: 'Performance testing', isCorrect: false }
        ],
        explanation: 'Penetration Testing (pen testing) simulate attacks để identify security weaknesses trước khi attackers exploit',
        difficulty: 'medium',
        tags: ['penetration-testing', 'ethical-hacking']
      },
      {
        content: 'Man-in-the-Middle (MITM) attack là gì?',
        options: [
          { text: 'Physical security breach', isCorrect: false },
          { text: 'Attacker intercept communication giữa 2 parties', isCorrect: true },
          { text: 'Password guessing', isCorrect: false },
          { text: 'Malware infection', isCorrect: false }
        ],
        explanation: 'MITM attacker secretly relay và có thể alter communication giữa 2 parties nghĩ họ đang communicate trực tiếp',
        difficulty: 'medium',
        tags: ['mitm', 'attack', 'network-security']
      },
      {
        content: 'VPN cung cấp security benefit nào?',
        options: [
          { text: 'Antivirus protection', isCorrect: false },
          { text: 'Encrypted tunnel và hide IP address', isCorrect: true },
          { text: 'Faster internet', isCorrect: false },
          { text: 'Firewall replacement', isCorrect: false }
        ],
        explanation: 'VPN tạo encrypted tunnel cho traffic, hide IP address và location, bảo vệ privacy trên public networks',
        difficulty: 'easy',
        tags: ['vpn', 'encryption', 'privacy']
      },
      {
        content: 'Zero-day vulnerability là gì?',
        options: [
          { text: 'Vulnerability đã được patch', isCorrect: false },
          { text: 'Vulnerability chưa được vendor biết hoặc patch', isCorrect: true },
          { text: 'Vulnerability không nguy hiểm', isCorrect: false },
          { text: 'Old vulnerability', isCorrect: false }
        ],
        explanation: 'Zero-day là vulnerability chưa được vendor discover/patch, attackers có thể exploit trước khi có fix',
        difficulty: 'hard',
        tags: ['vulnerability', 'zero-day', 'exploit']
      }
    ],
    trueFalse: [
      {
        content: 'HTTPS đảm bảo website hoàn toàn an toàn',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'HTTPS chỉ mã hóa communication. Website vẫn có thể có vulnerabilities (XSS, SQLi) hoặc malicious content',
        difficulty: 'medium',
        tags: ['https', 'security', 'misconceptions']
      },
      {
        content: 'Password nên được hash trước khi lưu vào database',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Hash passwords với salt (bcrypt, Argon2) để protect trong trường hợp database breach',
        difficulty: 'easy',
        tags: ['password', 'hashing', 'best-practice']
      },
      {
        content: 'Antivirus có thể bảo vệ khỏi mọi loại malware',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Antivirus dựa vào signatures và behavior patterns, không thể detect tất cả (especially zero-days). Cần layered security',
        difficulty: 'medium',
        tags: ['antivirus', 'malware', 'security']
      },
      {
        content: 'Public WiFi là an toàn nếu có password',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Public WiFi (kể cả có password) không an toàn. Attackers trên cùng network có thể sniff traffic. Nên dùng VPN',
        difficulty: 'easy',
        tags: ['wifi', 'network-security', 'vpn']
      },
      {
        content: 'Social engineering attacks target technical vulnerabilities',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Social engineering exploit human psychology, không phải technical vulnerabilities (phishing, pretexting, baiting)',
        difficulty: 'medium',
        tags: ['social-engineering', 'attack']
      },
      {
        content: 'AES (Advanced Encryption Standard) là symmetric encryption',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'AES là symmetric algorithm (same key cho encrypt và decrypt), widely used standard',
        difficulty: 'easy',
        tags: ['aes', 'encryption', 'symmetric']
      },
      {
        content: 'Longer passwords luôn tốt hơn complex passwords',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Length > complexity. "correct horse battery staple" (4 random words) an toàn hơn "P@ssw0rd!" và dễ nhớ hơn',
        difficulty: 'medium',
        tags: ['password', 'best-practice']
      },
      {
        content: 'Digital signature đảm bảo integrity và authentication',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Digital signature dùng asymmetric crypto để verify message không bị alter và authenticate sender',
        difficulty: 'medium',
        tags: ['digital-signature', 'integrity', 'authentication']
      },
      {
        content: 'Incognito/Private mode trong browser bảo vệ khỏi tracking',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Incognito chỉ xóa local history/cookies. ISP, employer, websites vẫn có thể track. Không phải anonymity tool',
        difficulty: 'medium',
        tags: ['privacy', 'browser', 'tracking']
      },
      {
        content: 'Security updates nên được install ngay khi available',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Security patches fix known vulnerabilities. Delay updates tạo window of opportunity cho attackers exploit',
        difficulty: 'easy',
        tags: ['updates', 'patches', 'best-practice']
      }
    ]
  },

  // Công nghệ phần mềm
  CNPM: {
    multipleChoice: [
      {
        content: 'SDLC là viết tắt của gì?',
        options: [
          { text: 'System Development Life Cycle', isCorrect: false },
          { text: 'Software Development Life Cycle', isCorrect: true },
          { text: 'Secure Data Life Cycle', isCorrect: false },
          { text: 'Standard Design Life Cycle', isCorrect: false }
        ],
        explanation: 'SDLC (Software Development Life Cycle) là process để plan, create, test và deploy software',
        difficulty: 'easy',
        tags: ['sdlc', 'basic', 'software-engineering']
      },
      {
        content: 'Agile methodology có đặc điểm gì?',
        options: [
          { text: 'Rigid planning', isCorrect: false },
          { text: 'Iterative development với frequent feedback', isCorrect: true },
          { text: 'Complete planning trước khi code', isCorrect: false },
          { text: 'Không có testing', isCorrect: false }
        ],
        explanation: 'Agile là iterative approach, deliver incremental updates, embrace change, focus on customer collaboration',
        difficulty: 'easy',
        tags: ['agile', 'methodology']
      },
      {
        content: 'Waterfall model khác Agile ở điểm nào?',
        options: [
          { text: 'Waterfall nhanh hơn', isCorrect: false },
          { text: 'Waterfall là sequential, Agile là iterative', isCorrect: true },
          { text: 'Waterfall không có testing', isCorrect: false },
          { text: 'Không có sự khác biệt', isCorrect: false }
        ],
        explanation: 'Waterfall là linear sequential phases (requirements → design → implementation → testing → deployment). Agile là iterative cycles',
        difficulty: 'easy',
        tags: ['waterfall', 'agile', 'methodology']
      },
      {
        content: 'Scrum là gì trong Agile?',
        options: [
          { text: 'Programming language', isCorrect: false },
          { text: 'Framework với roles, events và artifacts', isCorrect: true },
          { text: 'Testing tool', isCorrect: false },
          { text: 'Database', isCorrect: false }
        ],
        explanation: 'Scrum là Agile framework với roles (Scrum Master, PO, Team), events (Sprint, Daily Standup) và artifacts (Backlog)',
        difficulty: 'easy',
        tags: ['scrum', 'agile', 'framework']
      },
      {
        content: 'Unit Testing là gì?',
        options: [
          { text: 'Test toàn bộ system', isCorrect: false },
          { text: 'Test individual components/functions', isCorrect: true },
          { text: 'Test user interface', isCorrect: false },
          { text: 'Test performance', isCorrect: false }
        ],
        explanation: 'Unit Testing test individual units (functions, methods) in isolation để verify chúng work correctly',
        difficulty: 'easy',
        tags: ['testing', 'unit-test']
      },
      {
        content: 'CI/CD là gì?',
        options: [
          { text: 'Computer Integration/Computer Deployment', isCorrect: false },
          { text: 'Continuous Integration/Continuous Deployment', isCorrect: true },
          { text: 'Code Inspection/Code Debugging', isCorrect: false },
          { text: 'Client Integration/Client Development', isCorrect: false }
        ],
        explanation: 'CI/CD automate integration, testing và deployment. CI merge code frequently, CD automate release to production',
        difficulty: 'medium',
        tags: ['ci-cd', 'devops', 'automation']
      },
      {
        content: 'Design Pattern là gì?',
        options: [
          { text: 'UI/UX design', isCorrect: false },
          { text: 'Reusable solution cho common problems', isCorrect: true },
          { text: 'Database schema', isCorrect: false },
          { text: 'Network architecture', isCorrect: false }
        ],
        explanation: 'Design Patterns là proven solutions cho recurring design problems (Singleton, Factory, Observer, MVC...)',
        difficulty: 'medium',
        tags: ['design-pattern', 'software-design']
      },
      {
        content: 'Git là gì?',
        options: [
          { text: 'Programming language', isCorrect: false },
          { text: 'Version control system', isCorrect: true },
          { text: 'Web framework', isCorrect: false },
          { text: 'Database', isCorrect: false }
        ],
        explanation: 'Git là distributed version control system để track changes trong source code, collaborate với team',
        difficulty: 'easy',
        tags: ['git', 'version-control']
      },
      {
        content: 'Code review có lợi ích gì?',
        options: [
          { text: 'Chỉ để chỉ trích developers', isCorrect: false },
          { text: 'Improve code quality, share knowledge, catch bugs', isCorrect: true },
          { text: 'Làm chậm development', isCorrect: false },
          { text: 'Không có lợi ích', isCorrect: false }
        ],
        explanation: 'Code review giúp maintain quality, spread knowledge, catch issues early, ensure coding standards',
        difficulty: 'easy',
        tags: ['code-review', 'quality', 'collaboration']
      },
      {
        content: 'Technical debt là gì?',
        options: [
          { text: 'Money owed cho software licenses', isCorrect: false },
          { text: 'Cost of rework do quick/dirty solutions', isCorrect: true },
          { text: 'Budget cho project', isCorrect: false },
          { text: 'Salary của developers', isCorrect: false }
        ],
        explanation: 'Technical debt là implied cost của future rework khi chọn quick solution thay vì better approach takes longer',
        difficulty: 'medium',
        tags: ['technical-debt', 'software-engineering']
      },
      {
        content: 'Integration Testing test gì?',
        options: [
          { text: 'Individual functions', isCorrect: false },
          { text: 'Interaction giữa các components', isCorrect: true },
          { text: 'User interface only', isCorrect: false },
          { text: 'Performance only', isCorrect: false }
        ],
        explanation: 'Integration Testing verify các modules/components work together correctly khi integrated',
        difficulty: 'easy',
        tags: ['testing', 'integration-test']
      },
      {
        content: 'MVP (Minimum Viable Product) là gì?',
        options: [
          { text: 'Most Valuable Player', isCorrect: false },
          { text: 'Product với enough features để satisfy early users', isCorrect: true },
          { text: 'Fully completed product', isCorrect: false },
          { text: 'Marketing campaign', isCorrect: false }
        ],
        explanation: 'MVP có minimum features để validate idea và gather feedback từ early adopters trước khi full development',
        difficulty: 'medium',
        tags: ['mvp', 'product-development']
      },
      {
        content: 'Refactoring là gì?',
        options: [
          { text: 'Viết lại toàn bộ code', isCorrect: false },
          { text: 'Improve code structure không thay đổi behavior', isCorrect: true },
          { text: 'Add new features', isCorrect: false },
          { text: 'Fix bugs', isCorrect: false }
        ],
        explanation: 'Refactoring improve internal structure (readability, maintainability) mà không thay đổi external behavior',
        difficulty: 'medium',
        tags: ['refactoring', 'code-quality']
      },
      {
        content: 'Sprint trong Scrum thường kéo dài bao lâu?',
        options: [
          { text: '1 ngày', isCorrect: false },
          { text: '1-4 tuần (thường 2 tuần)', isCorrect: true },
          { text: '6 tháng', isCorrect: false },
          { text: '1 năm', isCorrect: false }
        ],
        explanation: 'Sprint là time-boxed iteration 1-4 tuần (typically 2 weeks) để complete set of work items',
        difficulty: 'easy',
        tags: ['scrum', 'sprint', 'agile']
      },
      {
        content: 'TDD (Test-Driven Development) follow process nào?',
        options: [
          { text: 'Write code → Write tests', isCorrect: false },
          { text: 'Write test → Write code → Refactor', isCorrect: true },
          { text: 'Write design → Write code', isCorrect: false },
          { text: 'Write documentation → Write code', isCorrect: false }
        ],
        explanation: 'TDD: Write failing test first → Write minimum code để pass test → Refactor. Red-Green-Refactor cycle',
        difficulty: 'medium',
        tags: ['tdd', 'testing', 'methodology']
      }
    ],
    trueFalse: [
      {
        content: 'Agile không cần documentation',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Agile value "working software over comprehensive documentation", không phải no documentation. Docs vẫn cần nhưng just enough',
        difficulty: 'medium',
        tags: ['agile', 'documentation', 'misconceptions']
      },
      {
        content: 'Version control chỉ dành cho code',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Version control có thể track bất kỳ files nào: code, docs, configs, images, design files',
        difficulty: 'easy',
        tags: ['version-control', 'git']
      },
      {
        content: 'Code coverage 100% đảm bảo software không có bugs',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: '100% coverage chỉ means tất cả lines được execute, không mean test cases cover all scenarios hoặc logic đúng',
        difficulty: 'medium',
        tags: ['testing', 'code-coverage']
      },
      {
        content: 'Daily Standup trong Scrum nên dưới 15 phút',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Daily Standup/Scrum là quick sync (≤15 min): What did I do? What will I do? Any blockers?',
        difficulty: 'easy',
        tags: ['scrum', 'daily-standup', 'agile']
      },
      {
        content: 'Pair Programming là lãng phí resources',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Pair Programming improve code quality, knowledge sharing, fewer bugs. Long-term benefits > initial "cost"',
        difficulty: 'medium',
        tags: ['pair-programming', 'collaboration']
      },
      {
        content: 'Automated testing thay thế hoàn toàn manual testing',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Automated testing tốt cho regression và repetitive tests. Manual testing vẫn cần cho exploratory, usability, ad-hoc testing',
        difficulty: 'medium',
        tags: ['testing', 'automation']
      },
      {
        content: 'Microservices architecture luôn tốt hơn Monolithic',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Microservices có benefits nhưng also complexity. Monolithic đơn giản hơn cho small teams/applications. Context matters',
        difficulty: 'hard',
        tags: ['architecture', 'microservices', 'monolithic']
      },
      {
        content: 'DevOps là một job title',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'DevOps là culture và practices kết hợp Development và Operations, không phải single role (dù có "DevOps Engineer" positions)',
        difficulty: 'medium',
        tags: ['devops', 'culture']
      },
      {
        content: 'Requirements không bao giờ thay đổi trong Waterfall model',
        options: [
          { text: 'Đúng', isCorrect: false },
          { text: 'Sai', isCorrect: true }
        ],
        explanation: 'Waterfall assumes stable requirements nhưng trong thực tế requirements vẫn có thể change (costly to accommodate though)',
        difficulty: 'medium',
        tags: ['waterfall', 'requirements']
      },
      {
        content: 'Clean code tự document chính nó',
        options: [
          { text: 'Đúng', isCorrect: true },
          { text: 'Sai', isCorrect: false }
        ],
        explanation: 'Well-written code với meaningful names và clear structure is self-documenting. Comments should explain "why", not "what"',
        difficulty: 'medium',
        tags: ['clean-code', 'documentation', 'best-practice']
      }
    ]
  }
};
