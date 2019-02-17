package br.edu.ifpb.gpes.extractf;

import br.edu.ifpb.gpes.extractf.models.PatternDetection;
import br.edu.ifpb.gpes.extractf.readers.FilePatternDetection;
import java.io.IOException;
import java.util.List;
import org.jdom2.JDOMException;

public class AppPatternDetection {
    public static void main(String[] args) throws JDOMException, IOException {
        FilePatternDetection filePatternDetection = new FilePatternDetection();
            
        List<PatternDetection> readOutput = filePatternDetection.readOutput();
        readOutput.forEach(pattern -> {
            System.out.println(pattern);
        });
    }
}
