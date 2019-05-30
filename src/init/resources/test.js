/**
Θα πρέπει να σκεφτείς πως οι διάφοροι τύποι iife μπορούν να μετασχηματιστούν σε modules. 
Προτείνω να γράψεις σε κάποιο report (π.χ. σε εκείνο που είχες αρχίσει να γράφεις) κάποιες λεπτομέρειες για να τις συζητήσουμε .
Μεταξύ άλλων θα πρέπει να λάβεις υπόψιν:
1. Υπάρχουν κάποιες περιπτώσεις που δεν μπορούν να γίνουν modules, π.χ. θα εισαχθούν σφάλματα ή δεν αξίζει τον κόπο;
2. Πως θα αντιστοιχιστούν σε στοιχεία το module, μεταξύ άλλων:
(a) οι τυχόν παράμετροι του iife, 
(b) οι global μεταβλητές ή μεταβλητές εξωτερικού scope -> δεν μπορω να σκεφτω τετοιο σεναριο με export
(c) οι μεταβλητές που ορίζονται εντός του iife -> δεν βρισκω λόγο να αποθηκευονται ξεχωριστα
(d) οι μεταβλητές που γίνονται με κάποιο τρόπο exported από το iife, 
        π.χ. ως γίνονται return ως τμήμα αντικειμένου, 
(e) οι συναρτήσεις που ορίζονται εντός του iife,
(f) ομοίως με d για συναρτήσεις που επιστρέφονται από το iife.
(g) περιπτώσεις που δεν περιλαμβάνονται παραπάνω;
 */



/*
!function ($) {
    "use strict"; // jshint ;_;
}(window.jQuery);
*/

var obj = require('./export_test').obj;
var add = require('./export_test').add;
var add2 = (require('./export_test').unnamed2)();
var func = ( require('./export_test').unnamed1 )();
var func_named = ( require('./export_test').named )();



console.log(obj);
console.log(add);
console.log(add2);
console.log(func);
console.log(func_named);